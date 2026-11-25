import addonChromatic from '@chromatic-com/storybook';
import addonA11y from '@storybook/addon-a11y';
import addonDesigns from '@storybook/addon-designs';
import addonDocs from '@storybook/addon-docs';
import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { definePreview } from '@storybook/react-vite';
import type { PropsWithChildren } from 'react';
import '../lib/fonts/index.css';
import '../lib/tokens/index.css';
import './preview.css';
import { dark, light, systemTheme } from './theme';

// The unity tokens follow the system colour scheme unless <html data-theme> overrides it.
function applyTheme(theme: unknown) {
  const root = document.documentElement;
  if (theme === 'light' || theme === 'dark') {
    root.dataset.theme = theme;
  } else {
    delete root.dataset.theme;
  }
  return { dark, light }[theme as string] ?? systemTheme;
}

type DocsStore = { store: { userGlobals: { get(): { theme?: string } } } };

// Storybook re-renders the Docs page when a toolbar value changes.
function ThemedDocsContainer(props: PropsWithChildren<DocsContainerProps>) {
  // ponytail: internal Storybook store, the only way to read toolbar values on a Docs page
  // without stories. Check it on Storybook upgrades.
  const { theme } = (props.context as unknown as DocsStore).store.userGlobals.get();
  return <DocsContainer {...props} theme={applyTheme(theme)} />;
}

export default definePreview({
  addons: [addonDocs(), addonA11y(), addonDesigns(), addonChromatic()],
  decorators: [
    (Story, { globals }) => {
      applyTheme(globals.theme);
      return Story();
    },
  ],
  globalTypes: {
    theme: {
      description: 'Colour theme for the components',
      toolbar: {
        dynamicTitle: true,
        icon: 'mirror',
        items: [
          { title: 'System theme', value: 'system' },
          { icon: 'sun', title: 'Light', value: 'light' },
          { icon: 'moon', title: 'Dark', value: 'dark' },
        ],
      },
    },
  },
  initialGlobals: { theme: 'system' },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: { container: ThemedDocsContainer },
  },

  tags: ['autodocs'],
});
