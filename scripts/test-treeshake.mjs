#!/usr/bin/env node

/**
 * Tree-shaking test for @gls-nxt/uikit
 *
 * Verifies that importing a single component from the library does NOT pull in
 * the entire bundle. Works by building two tiny apps with Vite (rollup):
 *   1. One that imports only `Button`
 *   2. One that imports all components
 * Then compares the output sizes. If the single-import build is close to the
 * full build, tree-shaking is broken.
 *
 * Usage:
 *   pnpm test:treeshake          # builds lib first, then tests
 *   pnpm test:treeshake --skip-build   # skips lib build (use existing dist/)
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const TMP = resolve(ROOT, '.treeshake-test');

const SKIP_BUILD = process.argv.includes('--skip-build');

// ── Helpers ──────────────────────────────────────────────────────────────────

function dirSize(dir) {
  let total = 0;
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const p = resolve(d, entry.name);
      if (entry.isDirectory()) {
        walk(p);
      } else {
        total += statSync(p).size;
      }
    }
  }
  walk(dir);
  return total;
}

function readAllFiles(dir) {
  const files = [];
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const p = resolve(d, entry.name);
      if (entry.isDirectory()) {
        walk(p);
      } else {
        files.push({ content: readFileSync(p, 'utf8'), path: p });
      }
    }
  }
  walk(dir);
  return files;
}

function fmt(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
}

// ── Test entry files ─────────────────────────────────────────────────────────

const SINGLE_ENTRY = `
import { Button } from '${DIST}/main.js';
// Use it so the bundler doesn't eliminate it as dead code
console.log(Button);
`;

const FEW_ENTRY = `
import { Button, Badge, Spinner } from '${DIST}/main.js';
console.log(Button, Badge, Spinner);
`;

const ALL_ENTRY = `
import {
  Badge, Button, Card, Checkbox, Combobox, ComboboxItem,
  Dialog, DialogClose, IconButton, InformationBox, Input, InputBase,
  Menu, MenuGroup, MenuHeading, MenuItem,
  RadioGroup, RadioItem, Spinner, Switch,
  Tabs, TabsContent, TabsList, TabsRoot, TabsTrigger,
  Toast, Toaster, Tooltip, Popover, Typography,
  Alert, Alerter, AlertProvider, useAlert,
  toast, useToast, useToasterState,
  PreloadFonts, StarRating
} from '${DIST}/main.js';
console.log(
  Badge, Button, Card, Checkbox, Combobox, ComboboxItem,
  Dialog, DialogClose, IconButton, InformationBox, Input, InputBase,
  Menu, MenuGroup, MenuHeading, MenuItem,
  RadioGroup, RadioItem, Spinner, Switch,
  Tabs, TabsContent, TabsList, TabsRoot, TabsTrigger,
  Toast, Toaster, Tooltip, Popover, Typography,
  Alert, Alerter, AlertProvider, useAlert,
  toast, useToast, useToasterState,
  PreloadFonts, StarRating
);
`;

// Components that should NOT appear when only Button is imported
const UNRELATED_MARKERS = [
  'StarRating',
  'Combobox',
  'RadioGroup',
  'Alerter',
  'Toaster',
  'TabsTrigger',
];

// ── Vite build wrapper ──────────────────────────────────────────────────────

async function bundle(name, code) {
  const entryDir = resolve(TMP, name);
  const outDir = resolve(TMP, `${name}-out`);
  mkdirSync(entryDir, { recursive: true });

  const entryFile = resolve(entryDir, 'entry.mjs');
  writeFileSync(entryFile, code);

  await build({
    build: {
      cssCodeSplit: false,
      emptyOutDir: true,
      minify: 'esbuild',
      outDir,
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom'],
        input: entryFile,
        output: {
          assetFileNames: '[name][extname]',
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
          format: 'es',
        },
        treeshake: {
          moduleSideEffects: false,
        },
      },
      sourcemap: false,
      write: true,
    },
    configFile: false,
    logLevel: 'silent',
    root: entryDir,
  });

  const size = dirSize(outDir);
  const files = readAllFiles(outDir);
  const jsContent = files
    .filter((f) => f.path.endsWith('.js'))
    .map((f) => f.content)
    .join('\n');

  return { jsContent, outDir, size };
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌲 Tree-shaking test for @gls-nxt/uikit\n');

  // 1. Ensure library is built
  if (!SKIP_BUILD || !existsSync(resolve(DIST, 'main.js'))) {
    console.log('  Building library…');
    const { execSync } = await import('node:child_process');
    execSync('pnpm build', { cwd: ROOT, stdio: 'inherit' });
    console.log();
  } else {
    console.log('  Using existing dist/ (--skip-build)\n');
  }

  // 2. Clean tmp dir
  rmSync(TMP, { force: true, recursive: true });
  mkdirSync(TMP, { recursive: true });

  // 3. Bundle test scenarios
  console.log('  Bundling scenarios…');

  const [single, few, all] = await Promise.all([
    bundle('single', SINGLE_ENTRY),
    bundle('few', FEW_ENTRY),
    bundle('all', ALL_ENTRY),
  ]);

  // 4. Results
  const ratio = single.size / all.size;
  const fewRatio = few.size / all.size;

  console.log('\n  ┌──────────────────────────────────────────────┐');
  console.log('  │  Scenario          │  Bundle size  │  Ratio  │');
  console.log('  ├──────────────────────────────────────────────┤');
  console.log(
    `  │  Button only        │  ${fmt(single.size).padEnd(12)} │  ${(ratio * 100).toFixed(1).padStart(5)}%  │`,
  );
  console.log(
    `  │  Button+Badge+Spin  │  ${fmt(few.size).padEnd(12)} │  ${(fewRatio * 100).toFixed(1).padStart(5)}%  │`,
  );
  console.log(`  │  All components     │  ${fmt(all.size).padEnd(12)} │  100.0%  │`);
  console.log('  └──────────────────────────────────────────────┘\n');

  // 5. Check for leaked component code in single-import bundle
  const leaked = UNRELATED_MARKERS.filter((marker) => {
    // Search for the component function/variable name in the JS output
    // Use a rough heuristic: the component name should appear as an identifier
    const re = new RegExp(`\\b${marker}\\b`);
    return re.test(single.jsContent);
  });

  let pass = true;

  if (leaked.length > 0) {
    console.log('  ❌ FAIL: Unused components found in single-import bundle:');
    leaked.forEach((m) => {
      console.log(`     • ${m}`);
    });
    console.log();
    pass = false;
  } else {
    console.log('  ✅ No unused component code leaked into single-import bundle');
  }

  // Ratio check: single-import should be significantly smaller than full
  const RATIO_THRESHOLD = 0.4; // single should be < 40% of full
  if (ratio > RATIO_THRESHOLD) {
    console.log(
      `  ❌ FAIL: Single-import bundle is ${(ratio * 100).toFixed(1)}% of full (threshold: <${RATIO_THRESHOLD * 100}%)`,
    );
    pass = false;
  } else {
    console.log(
      `  ✅ Single-import bundle is ${(ratio * 100).toFixed(1)}% of full (threshold: <${RATIO_THRESHOLD * 100}%)`,
    );
  }

  // Few-imports should be between single and full but closer to single
  if (fewRatio > 0.6) {
    console.log(
      `  ⚠️  WARN: 3-component bundle is ${(fewRatio * 100).toFixed(1)}% of full — may indicate leaky tree-shaking`,
    );
  }

  // 6. Cleanup
  rmSync(TMP, { force: true, recursive: true });

  console.log();
  if (!pass) {
    console.log('  ❌ Tree-shaking test FAILED\n');
    process.exit(1);
  } else {
    console.log('  ✅ Tree-shaking test PASSED\n');
  }
}

main().catch((err) => {
  console.error(err);
  rmSync(TMP, { force: true, recursive: true });
  process.exit(1);
});
