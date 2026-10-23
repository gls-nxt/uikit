#!/usr/bin/env node

/**
 * Optimise built SVG icons in dist/icons/ using SVGO.
 * Runs as part of postbuild — source files in assets/icons/ are untouched.
 *
 * Usage:
 *   pnpm optimize:icons            # optimise dist icons
 *   pnpm optimize:icons --dry-run  # show savings without writing files
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadConfig, optimize } from 'svgo';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = resolve(__dirname, '../dist/icons');
const DRY_RUN = process.argv.includes('--dry-run');

async function main() {
  const config = await loadConfig(resolve(__dirname, '../svgo.config.mjs'));
  const files = (await readdir(ICONS_DIR)).filter((f) => f.endsWith('.svg'));

  let totalBefore = 0;
  let totalAfter = 0;
  let optimizedCount = 0;

  console.log(`\n🔧 Optimising ${files.length} SVG icons${DRY_RUN ? ' (dry run)' : ''}…\n`);

  for (const file of files) {
    const filePath = resolve(ICONS_DIR, file);
    const original = await readFile(filePath, 'utf8');
    const result = optimize(original, { ...config, path: filePath });

    const before = Buffer.byteLength(original, 'utf8');
    const after = Buffer.byteLength(result.data, 'utf8');
    totalBefore += before;
    totalAfter += after;

    if (after < before) {
      optimizedCount++;
      const saved = before - after;
      const pct = ((saved / before) * 100).toFixed(1);
      if (DRY_RUN) {
        console.log(
          `  ${file.padEnd(35)} ${fmt(before)} → ${fmt(after)}  (-${fmt(saved)}, -${pct}%)`,
        );
      }

      if (!DRY_RUN) {
        await writeFile(filePath, result.data);
      }
    }
  }

  const totalSaved = totalBefore - totalAfter;
  const totalPct = ((totalSaved / totalBefore) * 100).toFixed(1);

  console.log('\n  ┌──────────────────────────────────────────────┐');
  console.log(`  │  Files processed:   ${String(files.length).padStart(6)}                  │`);
  console.log(`  │  Files optimized:   ${String(optimizedCount).padStart(6)}                  │`);
  console.log(`  │  Before:            ${fmt(totalBefore).padStart(10)}              │`);
  console.log(`  │  After:             ${fmt(totalAfter).padStart(10)}              │`);
  console.log(`  │  Saved:             ${fmt(totalSaved).padStart(10)} (-${totalPct}%)      │`);
  console.log('  └──────────────────────────────────────────────┘\n');

  if (DRY_RUN) {
    console.log('  (dry run — no files were modified)\n');
  }
}

function fmt(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
