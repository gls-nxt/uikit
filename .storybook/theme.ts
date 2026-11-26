import { create } from 'storybook/theming/create';

const brand = {
  appBorderRadius: 4,
  brandImage: '/brand/logo.svg',
  brandUrl: 'https://gls-pakete.de',
};

// Hex copies of the unity gray tokens: the manager theme cannot read CSS variables.
export const light = create({
  ...brand,
  appBg: '#FCFCFD',
  appBorderColor: '#E4E7EC',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  base: 'light',
});

export const dark = create({
  ...brand,
  appBg: '#18191B',
  appBorderColor: '#2E3135',
  appContentBg: '#212225',
  appPreviewBg: '#212225',
  base: 'dark',
});

// Reads the current OS colour scheme on each call.
export const systemTheme = () =>
  globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ? dark : light;
