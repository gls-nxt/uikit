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
};
export default config;
