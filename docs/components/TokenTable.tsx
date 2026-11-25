import type React from 'react';
import { useEffect, useState } from 'react';
import styles from './TokenTable.module.css';
import { useTokenRefresh } from './useTokenRefresh';

type Preview =
  | 'border-width'
  | 'font-family'
  | 'font-size'
  | 'font-weight'
  | 'letter-spacing'
  | 'line-height'
  | 'none'
  | 'radius'
  | 'shadow'
  | 'size'
  | 'spacing'
  | 'text-style';

type TokenTableProps = {
  /** CSS custom property names, or text style prefixes such as `--unity-body-3` for `text-style`. */
  tokens: string[];
  preview?: Preview;
};

function previewStyle(preview: Preview, token: string): React.CSSProperties {
  const v = `var(${token})`;
  switch (preview) {
    case 'border-width':
      return { borderTopWidth: v };
    case 'font-family':
      return { fontFamily: v };
    case 'font-size':
      return { fontSize: v };
    case 'font-weight':
      return { fontWeight: v };
    case 'letter-spacing':
      return { letterSpacing: v };
    case 'line-height':
      return { lineHeight: v };
    case 'radius':
      return { borderRadius: v };
    case 'shadow':
      return { boxShadow: `0 4px 12px ${v}` };
    case 'size':
    case 'spacing':
      return { height: v, width: v };
    case 'text-style':
      return {
        fontSize: `var(${token}-font-size)`,
        letterSpacing: `var(${token}-letter-spacing, normal)`,
        lineHeight: `var(${token}-line-height)`,
      };
    default:
      return {};
  }
}

function resolve(token: string, preview: Preview): string {
  const root = getComputedStyle(document.documentElement);
  if (preview !== 'text-style') {
    return root.getPropertyValue(token).trim();
  }
  return ['font-size', 'line-height', 'letter-spacing']
    .map((p) => root.getPropertyValue(`${token}-${p}`).trim())
    .filter(Boolean)
    .join(' / ');
}

const TEXT_PREVIEWS = new Set<Preview>([
  'font-family',
  'font-size',
  'font-weight',
  'letter-spacing',
  'line-height',
  'text-style',
]);

export function TokenTable({ tokens, preview = 'none' }: TokenTableProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const refresh = useTokenRefresh();

  // biome-ignore lint/correctness/useExhaustiveDependencies: refresh re-reads the CSS values after a theme or viewport change
  useEffect(() => {
    setValues(Object.fromEntries(tokens.map((t) => [t, resolve(t, preview)])));
  }, [tokens, preview, refresh]);

  return (
    <table className={`${styles.table} sb-unstyled`}>
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
          {preview !== 'none' && <th>Preview</th>}
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <tr key={token}>
            <td>
              <code>{token}</code>
            </td>
            <td>
              <code>{values[token] ?? ''}</code>
            </td>
            {preview !== 'none' && (
              <td>
                {TEXT_PREVIEWS.has(preview) ? (
                  <span className={styles.text} style={previewStyle(preview, token)}>
                    Parcel on its way
                  </span>
                ) : (
                  <div
                    className={`${styles.box} ${styles[`box--${preview}`] ?? ''}`}
                    style={previewStyle(preview, token)}
                  />
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
