import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: [{ from: './brand', to: '/brand' }],
  stories: ['../lib/**/*.mdx', '../lib/**/*.stories.@(js|jsx|ts|tsx)', '../docs/*.mdx'],
};
export default config;
