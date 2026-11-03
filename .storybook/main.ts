import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    // Reference the preset directly to avoid the addon being loaded twice.
    // See https://github.com/UX-and-I/storybook-design-token/issues/227
    'storybook-design-token/preset',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../lib/**/*.mdx', '../lib/**/*.stories.@(js|jsx|ts|tsx)', '../docs/*.mdx'],
  // Vite's dep scan misses imports in docs/*.mdx, so it would discover this on first page load,
  // re-optimise and reload mid-request, which hangs the preview with "Server timed out".
  viteFinal: (config) => ({
    ...config,
    optimizeDeps: {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include ?? []), 'storybook-design-token'],
    },
  }),
};
export default config;
