import getContrastRatio from 'get-contrast-ratio';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import styles from './ColorPalette.module.css';

type ColorToken = {
  name: string;
  value: string;
};

type ColorGroup = {
  label: string;
  colors: ColorToken[];
};

type ColorPaletteProps = {
  groups: string[][];
  variant?: 'primitive' | 'semantic';
  tokenPrefix?: string;
};

const DEFAULT_TOKEN_PREFIX = '--gls-color-';

function deriveLabel(tokens: string[], prefix: string): string {
  const first = tokens[0] ?? '';
  const varName = first.startsWith('--') ? first : `--${first}`;
  const stripped = varName.startsWith(prefix) ? varName.slice(prefix.length) : varName.slice(2);
  const segment = stripped.split('-')[0];
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

function normalizeGroups(groups: string[][], prefix: string): ColorGroup[] {
  return groups.map((tokens) => ({
    colors: tokens.map((t) => {
      const varName = t.startsWith('--') ? t : `--${t}`;
      const name = varName.startsWith(prefix) ? varName.slice(prefix.length) : varName.slice(2);
      return { name, value: `var(${varName})` };
    }),
    label: deriveLabel(tokens, prefix),
  }));
}

const VAR_RE = /^var\((--[^)]+)\)$/;

function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) {
    return null;
  }
  const r = Number.parseInt(match[1], 10);
  const g = Number.parseInt(match[2], 10);
  const b = Number.parseInt(match[3], 10);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

let probeEl: HTMLDivElement | null = null;

function getProbeElement(): HTMLDivElement {
  if (!probeEl?.isConnected) {
    probeEl = document.createElement('div');
    probeEl.style.display = 'none';
    document.body.appendChild(probeEl);
  }
  return probeEl;
}

/**
 * Resolves a CSS value to a hex color.
 * For var(--token) values, reads directly from :root computed style.
 * Falls back to a single reusable hidden element for other CSS color values.
 */
function resolveToHex(value: string): string | null {
  if (value.startsWith('#')) {
    return value;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  // Fast path: resolve var(--token) directly from :root
  const varMatch = value.match(VAR_RE);
  if (varMatch) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(varMatch[1]).trim();
    if (raw.startsWith('#')) {
      return raw;
    }
    if (raw) {
      return rgbToHex(raw);
    }
    return null;
  }

  // Fallback: reuse a single hidden element for arbitrary CSS color values
  const el = getProbeElement();
  el.style.color = value;
  const computed = getComputedStyle(el).color;
  if (!computed) {
    return null;
  }
  return rgbToHex(computed);
}

type ResolvedMap = Map<string, string>;

function mapsEqual(a: ResolvedMap, b: ResolvedMap): boolean {
  if (a.size !== b.size) {
    return false;
  }
  for (const [k, v] of a) {
    if (b.get(k) !== v) {
      return false;
    }
  }
  return true;
}

function useResolvedColors(groups: ColorGroup[]): ResolvedMap {
  const [resolved, setResolved] = useState<ResolvedMap>(new Map());

  useEffect(() => {
    const map = new Map<string, string>();
    for (const group of groups) {
      for (const color of group.colors) {
        const hex = resolveToHex(color.value);
        if (hex) {
          map.set(color.value, hex);
        }
      }
    }
    setResolved((prev) => (mapsEqual(prev, map) ? prev : map));
  }, [groups]);

  return resolved;
}

type ContrastPair = { name: string; hex: string; ratio: number };

function getPassingColors(
  bgHex: string,
  groupColors: ColorToken[],
  resolvedMap: ResolvedMap,
): ContrastPair[] {
  const candidates: { name: string; hex: string }[] = [
    { hex: '#ffffff', name: 'white' },
    { hex: '#191919', name: 'black' },
    ...groupColors
      .filter((c) => {
        const h = resolvedMap.get(c.value);
        return h && h !== bgHex;
      })
      .map((c) => ({ hex: resolvedMap.get(c.value) as string, name: c.name })),
  ];

  return candidates
    .map((c) => ({ ...c, ratio: getContrastRatio(c.hex, bgHex) }))
    .filter((c) => c.ratio >= 4.5)
    .sort((a, b) => b.ratio - a.ratio);
}

function ContrastPairs({
  bgHex,
  groupColors,
  resolvedMap,
}: {
  bgHex: string | null;
  groupColors: ColorToken[];
  resolvedMap: ResolvedMap;
}) {
  if (!bgHex) {
    return null;
  }

  const pairs = getPassingColors(bgHex, groupColors, resolvedMap);
  if (pairs.length === 0) {
    return null;
  }

  return (
    <div className={styles.pairs}>
      {pairs.map((p) => (
        <span className={styles.pair} key={p.name} style={{ color: p.hex }}>
          {p.name} <span className={styles.ratio}>{p.ratio.toFixed(1)}</span>
        </span>
      ))}
    </div>
  );
}

function StripItem({
  color,
  groupColors,
  resolvedMap,
}: {
  color: ColorToken;
  groupColors: ColorToken[];
  resolvedMap: ResolvedMap;
}) {
  const hex = resolvedMap.get(color.value) ?? null;

  return (
    <div className={styles.strip} style={{ '--swatch-bg': color.value } as React.CSSProperties}>
      <div className={styles.meta}>
        <span className={styles.name}>{color.name}</span>
        <span className={styles.hex}>{hex ?? color.value}</span>
      </div>
      <ContrastPairs bgHex={hex} groupColors={groupColors} resolvedMap={resolvedMap} />
    </div>
  );
}

function getShadeKey(name: string): string {
  const match = name.match(/(-?\d+)$/);
  return match ? match[1] : name;
}

function SemanticCard({ color, resolvedMap }: { color: ColorToken; resolvedMap: ResolvedMap }) {
  const hex = resolvedMap.get(color.value) ?? null;

  return (
    <div className={styles.semanticCard}>
      <div className={styles.semanticSwatch} style={{ backgroundColor: color.value }} />
      <div className={styles.semanticInfo}>
        <span className={styles.semanticName}>{color.name}</span>
        <span className={styles.semanticHex}>{hex ?? color.value}</span>
      </div>
    </div>
  );
}

export function ColorPalette({
  groups: rawGroups,
  variant = 'primitive',
  tokenPrefix = DEFAULT_TOKEN_PREFIX,
}: ColorPaletteProps) {
  const groups = useMemo(() => normalizeGroups(rawGroups, tokenPrefix), [rawGroups, tokenPrefix]);
  const resolvedMap = useResolvedColors(groups);

  if (variant === 'semantic') {
    return (
      <div className={`${styles.semanticWrapper} sb-unstyled`}>
        {groups.map((group) => (
          <div className={styles.semanticSection} key={group.label}>
            <div className={styles.semanticGrid}>
              {group.colors.map((color) => (
                <SemanticCard color={color} key={color.name} resolvedMap={resolvedMap} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Build aligned grid: collect all unique shade keys in order
  const shadeKeys: string[] = [];
  const seen = new Set<string>();
  for (const group of groups) {
    for (const color of group.colors) {
      const key = getShadeKey(color.name);
      if (!seen.has(key)) {
        seen.add(key);
        shadeKeys.push(key);
      }
    }
  }

  // Map each group's colors by shade key
  const groupMaps = groups.map((group) => {
    const map = new Map<string, ColorToken>();
    for (const color of group.colors) {
      map.set(getShadeKey(color.name), color);
    }
    return map;
  });

  const colCount = groups.length;

  return (
    <div
      className={`${styles.wrapper} sb-unstyled`}
      style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
    >
      {/* Color rows */}
      {shadeKeys.map((key) =>
        groupMaps.map((map, gi) => {
          const color = map.get(key);
          return (
            <div className={styles.cell} key={`${groups[gi].label}-${key}`}>
              {color ? (
                <StripItem
                  color={color}
                  groupColors={groups[gi].colors}
                  resolvedMap={resolvedMap}
                />
              ) : (
                <div className={styles.empty} />
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}
