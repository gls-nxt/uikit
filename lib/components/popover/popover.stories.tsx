import { Button } from '@components/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Popover } from './popover';

const meta = {
  args: {
    onOpenChange: action('onOpenChange'),
  },
  argTypes: {
    align: {
      control: 'radio',
      description: 'The preferred alignment against the trigger.',
      options: ['start', 'center', 'end'],
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'center' },
        type: { summary: 'string' },
      },
    },
    onOpenChange: {
      control: false,
      description: 'The callback function that is called when the popover state changes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: '(open: boolean) => void' },
      },
    },
    side: {
      control: { type: 'radio' },
      description: 'The preferred side of the trigger to render against when open.',
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'top' },
        type: { summary: 'string' },
      },
    },
    trigger: {
      control: false,
      description: 'Custom trigger component',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
    width: {
      control: 'select',
      description: 'The max width of the popover component.',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
        type: { summary: 'string' },
      },
    },
  },
  component: Popover,
  parameters: {
    // Configure a11y rules to handle Radix UI's dynamic ARIA attributes
    // Radix UI generates dynamic IDs for accessibility attributes at runtime
    // which can't be validated during static analysis
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-valid-attr-value',
            selector: '*:not([aria-controls^="radix-:"])',
          },
        ],
      },
    },
    actions: {
      handles: ['select'],
    },
    docs: {
      description: {
        component: 'A component for rendering Popover with various styles and options.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Popover',
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Popover Content',
    trigger: <Button size="md">Click me</Button>,
  },
  parameters: {
    // Disable aria-valid-attr-value check for this story
    // This is necessary because Storybook's static analysis cannot verify
    // Radix UI's dynamically generated ARIA IDs, but they are valid at runtime
    a11y: {
      config: {
        rules: [
          {
            enabled: false,
            id: 'aria-valid-attr-value',
          },
        ],
      },
    },
  },
};

export const WithHeading: Story = {
  args: {
    children: 'Popover Content with heading',
    heading: 'Popover Heading',
    trigger: <Button size="md">Click me</Button>,
  },
  parameters: {
    // Same a11y configuration as Default story
    // Radix UI handles accessibility correctly at runtime with dynamic IDs
    a11y: {
      config: {
        rules: [
          {
            enabled: false,
            id: 'aria-valid-attr-value',
          },
        ],
      },
    },
  },
};
