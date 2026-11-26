import { addons } from 'storybook/manager-api';

import { systemTheme } from './theme';

addons.setConfig({
  // ponytail: read once at load, so a system theme change shows in the manager after a reload.
  theme: systemTheme(),
});
