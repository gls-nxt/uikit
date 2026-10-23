import addonChromatic from '@chromatic-com/storybook';
import addonA11y from '@storybook/addon-a11y';
import addonDesigns from '@storybook/addon-designs';
import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';
import '../lib/fonts/index.css';
import '../lib/tokens/index.css';
import '../lib/tokens/primitiveColorNew.css';

export default definePreview({
  addons: [addonDocs(), addonA11y(), addonDesigns(), addonChromatic()],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    designToken: {
      defaultTab: 'Colors',
    },
  },

  tags: ['autodocs'],
});
