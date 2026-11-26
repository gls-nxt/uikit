import addonChromatic from '@chromatic-com/storybook';
import addonA11y from '@storybook/addon-a11y';
import addonDesigns from '@storybook/addon-designs';
import addonDocs from '@storybook/addon-docs';
import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { definePreview } from '@storybook/react-vite';
import { type PropsWithChildren, type ReactNode, useState } from 'react';
import { DialogContext } from '../lib/components/dialog/dialogContext';
import './dark-compare.css';
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
  return { dark, light }[theme as string] ?? systemTheme();
}

// Demo only: portals (tooltip, popover, menu, combobox) render inside the panel so they pick up its tokens.
function DarkPanel({
  className,
  title,
  children,
}: {
  className: string;
  title: string;
  children: ReactNode;
}) {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const ctx = {
    id: className,
    onOpenChange: undefined,
    portalContainer: el as HTMLDialogElement | null,
    setPortalContainer: () => {},
  };
  return (
    <div
      className={className}
      ref={setEl}
      style={{ borderRadius: 8, flex: '1 1 0', minWidth: 0, padding: 16, position: 'relative' }}
    >
      <div
        style={{
          font: '600 12px/1 sans-serif',
          letterSpacing: '0.05em',
          marginBottom: 12,
          opacity: 0.7,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <DialogContext.Provider value={ctx}>{el ? children : null}</DialogContext.Provider>
    </div>
  );
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
      return (
        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          <DarkPanel className="dark-old" title="Current dark">
            <Story />
          </DarkPanel>
          <DarkPanel className="dark-new" title="Proposed dark">
            <Story />
          </DarkPanel>
        </div>
      );
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
