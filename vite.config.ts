import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 0, // Disable inlining of assets
    lib: {
      entry: resolve(import.meta.dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      input: {
        ...Object.fromEntries(
          glob
            .sync('lib/**/*.{ts,tsx}', {
              ignore: [
                'lib/**/*.d.ts',
                'lib/**/*.{test,spec}.{ts,tsx}',
                'lib/**/*.stories.{ts,tsx}',
                'lib/**/generate-index.ts',
                'lib/icons/index.tsx',
                'lib/icons/generated/**',
              ],
            })
            .map((file) => [
              relative('lib', file.slice(0, file.length - extname(file).length)),
              fileURLToPath(new URL(file, import.meta.url)),
            ]),
        ),
        tokens: resolve(import.meta.dirname, 'lib/tokens/index.css'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          const assetName = assetInfo.names[0];
          const ext = extname(assetName);
          if (ext === '.css' && assetName.includes('tokens')) {
            return 'tokens/index.css';
          }
          return 'assets/[name][extname]';
        },
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        manualChunks: undefined,
      },
    },
    sourcemap: true,
  },
  plugins: [
    react(),
    svgr({
      esbuildOptions: {
        loader: 'tsx',
        target: 'esnext',
      },
      include: '**/*.svg',
      oxcOptions: {
        lang: 'tsx',
      },
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: 'default',
        memo: true,
        ref: true,
        svgo: false,
        titleProp: true,
        typescript: true,
      },
    }),
    libInjectCss(),
    viteStaticCopy({
      targets: [
        {
          dest: 'fonts',
          rename: { stripBase: true },
          src: 'lib/fonts/index.css',
        },
        {
          dest: 'fonts',
          rename: { stripBase: true },
          src: 'lib/fonts/*.woff2',
        },
      ],
    }),
    dts({
      beforeWriteFile: (filePath, content) => {
        let updatedContent = content;
        if (filePath.includes('.d.ts')) {
          updatedContent = content.replace(
            /import .* from ['"].*\.svg['"];/g,
            (match) => `${match.replace('.svg', '.svg?react')}`,
          );
        }
        return { content: updatedContent, filePath };
      },
      compilerOptions: {
        declarationDir: 'dist',
        emitDeclarationOnly: true,
        rootDir: 'lib',
      },
      entryRoot: 'lib',
      exclude: [
        'lib/**/*.{test,spec}.{ts,tsx}',
        'lib/**/*.stories.{ts,tsx}',
        'lib/icons/generate-index.ts',
        'lib/icons/index.tsx',
        'lib/icons/generated/**',
      ],
      include: ['lib', 'svg.d.ts'],
      outDirs: ['dist'],
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    coverage: {
      exclude: [
        // Config files
        'postcss.config.js',
        'vite.config.ts',
        '**/*.config.{js,ts}',

        // Index files that only handle exports
        '**/index.{ts,tsx}',
        'lib/main.ts',

        // Storybook files
        '**/*.stories.{ts,tsx}',
        '**/storybook-static/**',
        '.storybook/**',

        // Build outputs and other non-source files
        'dist/**',
        'coverage/**',
        'node_modules/**',

        // Test setup files
        'vitest.setup.ts',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',

        // Type definition files
        '**/*.d.ts',
      ],
      include: ['lib/**/*.{ts,tsx}'],
      provider: 'v8', // Use the Node v8 engine for coverage
      reporter: ['text', 'json', 'html'], // Formats for displaying coverage results
      // TODO: Increase coverage threshold
      thresholds: {
        branches: 80,
        functions: 70,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom', // Simulates a browser-like environment
    globals: true, // Enables global imports for testing
    include: ['lib/**/*.{test,spec}.{ts,tsx}'], // Include test files from your library
    setupFiles: './vitest.setup.ts', // Setup file for global configurations
  },
});
