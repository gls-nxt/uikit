import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { action } from 'storybook/actions';

import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
  args: {
    onClose: action('onClose'),
  },
  argTypes: {
    action: {
      control: 'text',
      description: 'Custom action element to display in the alert.',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the alert.',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    closeLabel: {
      control: 'text',
      description: 'Accessible label for the close button.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Test ID for testing purposes.',
      table: {
        category: 'Testing',
        type: { summary: 'string' },
      },
    },
    message: {
      control: 'text',
      description: 'The main message text of the alert.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    showClose: {
      control: 'boolean',
      description: 'Whether to show the close button.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    title: {
      control: 'text',
      description: 'The title text of the alert.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      description: 'The visual style of the alert.',
      options: ['info', 'warning', 'error'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'info' },
        type: { summary: 'string' },
      },
    },
  },
  component: Alert,
  decorators: [
    (Story) => (
      <div style={{ height: '200px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: ['onClose'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/branch/NV6tLfxCDKWbxBOPSWUylc/Unity-Design-System?m=auto&node-id=5622-17295&t=V9MUllktcAGV0XKY-1',
    },
    docs: {
      description: {
        component: 'A component for displaying important messages, warnings, or errors to users.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/Alert',
} as const;

export default meta;
type Story = StoryObj<typeof Alert>;
type AlertStoryArgs = ComponentProps<typeof Alert>;

const renderAlert = (args: AlertStoryArgs) => (
  <Alert.Root
    className={args.className}
    data-testid={args['data-testid']}
    shadow={args.shadow}
    variant={args.variant}
  >
    <Alert.Icon />
    <Alert.Content>
      {args.title ? <Alert.Title>{args.title}</Alert.Title> : null}
      {args.message ? <Alert.Description>{args.message}</Alert.Description> : null}
      {args.children}
    </Alert.Content>
    {args.action || args.showClose ? (
      <Alert.Action>
        {args.action}
        {args.showClose ? (
          <Alert.Close
            aria-label={args.closeLabel}
            data-testid={args['data-testid'] ? `${args['data-testid']}Close` : undefined}
            onClick={args.onClose}
          />
        ) : null}
      </Alert.Action>
    ) : null}
  </Alert.Root>
);

export const Default: Story = {
  args: {
    message: 'This is an informational message.',
    title: 'Information',
    variant: 'info',
  },
  render: renderAlert,
};

export const Variants: Story = {
  render: function Render(args) {
    const variants = ['info', 'warning', 'error'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {variants.map((variant) => (
          <Alert.Root className={args.className} key={variant} variant={variant}>
            <Alert.Icon />
            <Alert.Content>
              <Alert.Title>
                {`${variant.charAt(0).toUpperCase() + variant.slice(1)} Alert`}
              </Alert.Title>
              <Alert.Description>{`This is a ${variant} message.`}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ))}
      </div>
    );
  },
};

export const WithAction: Story = {
  args: {
    ...Default.args,
    action: (
      <button
        onClick={action('action-click')}
        style={{ color: 'var(--gls-color-text-error)' }}
        type="button"
      >
        Retry
      </button>
    ),
    message: 'Something went wrong while saving your changes.',
    title: 'Error',
    variant: 'error',
  },
  render: renderAlert,
};

export const WithCloseButton: Story = {
  args: {
    ...Default.args,
    closeLabel: 'Close',
    'data-testid': 'alert',
    showClose: true,
  },
  render: renderAlert,
};

export const LongContent: Story = {
  args: {
    ...Default.args,
    message:
      'This is a very long message that demonstrates how the alert component handles longer content. It should wrap properly and maintain its layout while remaining readable.',
  },
  render: renderAlert,
};

export const WithListChildren: Story = {
  args: {
    ...Default.args,
    children: (
      <ul style={{ margin: 0, paddingInlineStart: '1.25rem' }}>
        <li>First item that needs your attention</li>
        <li>Second item with more detail</li>
        <li>Third item to review</li>
      </ul>
    ),
    message: 'Please address the following items:',
    title: 'Action required',
    variant: 'warning',
  },
  render: renderAlert,
};

export const WithoutShadow: Story = {
  args: {
    ...Default.args,
    message: 'This is a flat alert that can be used inline without any shadow.',
    shadow: false,
  },
  render: renderAlert,
};
