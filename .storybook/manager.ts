import { addons } from 'storybook/manager-api';

import { systemTheme } from './theme';

addons.setConfig({
  theme: systemTheme,
});
