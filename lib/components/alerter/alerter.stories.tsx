import Button from '@components/button';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AlertProvider, useAlert } from '../use-alert';

import { Alerter } from './alerter';

const meta = {
  component: Alerter,
  parameters: {
    docs: {
      description: {
        component: `
The Alerter component is used internally by AlertProvider to display alerts. To use alerts in your application, wrap your components with AlertProvider:

\`\`\`jsx
<AlertProvider>
  <YourApp />
</AlertProvider>
\`\`\`

The AlertProvider accepts these props:
- \`contained\` (boolean) - When true, alerts will be contained within the provider's boundaries
- \`maxVisibleAlerts\` (number) - Maximum number of alerts shown at once (default: 3)
        `,
      },
    },
    layout: 'padded',
  },
  title: 'Components/Alerter',
} satisfies Meta<typeof Alerter>;

export default meta;
type Story = StoryObj<typeof Alerter>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <AlertProvider>
        <Story />
      </AlertProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'By default, alerts will float at the top of the viewport.',
      },
    },
  },
  render: function AlerterStory() {
    const { showAlert } = useAlert();

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button
          onClick={() =>
            showAlert({
              message: 'This is an informational message',
              title: 'Info Alert',
              variant: 'info',
            })
          }
        >
          Show Info Alert
        </Button>
      </div>
    );
  },
};

export const Contained: Story = {
  decorators: [
    (Story) => (
      <AlertProvider contained>
        <Story />
      </AlertProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "When the AlertProvider's `contained` prop is true, alerts will be positioned within the provider's boundaries instead of floating at the top of the viewport.",
      },
    },
  },
  render: function ContainedAlerterStory() {
    const { showAlert } = useAlert();

    return (
      <div
        style={{
          border: '1px solid #ccc',
          minHeight: '200px',
          padding: '1rem',
        }}
      >
        <Button
          onClick={() =>
            showAlert({
              message: 'This alert appears within the container',
              title: 'Contained Alert',
              variant: 'info',
            })
          }
        >
          Show Contained Alert
        </Button>
      </div>
    );
  },
};

export const MultipleAlerts: Story = {
  decorators: [
    (Story) => (
      <AlertProvider maxVisibleAlerts={3}>
        <Story />
      </AlertProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Use `maxVisibleAlerts` prop to control how many alerts can be shown simultaneously.',
      },
    },
  },
  render: function MultipleAlertsStory() {
    const { showAlert } = useAlert();

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button
          onClick={() =>
            showAlert({
              message: 'This is an informational message',
              title: 'Info Alert',
              variant: 'info',
            })
          }
        >
          Show Info Alert
        </Button>
        <Button
          onClick={() =>
            showAlert({
              message: 'This is a warning message',
              title: 'Warning Alert',
              variant: 'warning',
            })
          }
        >
          Show Warning Alert
        </Button>
        <Button
          onClick={() =>
            showAlert({
              message: 'This is an error message',
              title: 'Error Alert',
              variant: 'error',
            })
          }
        >
          Show Error Alert
        </Button>
      </div>
    );
  },
};
