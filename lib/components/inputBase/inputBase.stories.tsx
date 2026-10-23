import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputBase } from './inputBase';

const meta = {
  argTypes: {
    className: {
      control: 'text',
      description:
        'Custom class name for styling the input. This allows for additional custom styling beyond what is provided by default.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input field.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    hasError: {
      control: 'boolean',
      description: 'Display the input field in an error state.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the input field.',
      options: ['lg', 'md', 'sm'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'lg' },
        type: { summary: 'string' },
      },
    },
  },
  component: InputBase,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: ['change', 'focus', 'blur'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=1185-17941&t=2ZteITsfMR9rcz7l-1',
    },
    docs: {
      description: {
        component: 'A component for rendering input with various styles and options.',
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/InputBase',
} satisfies Meta<typeof InputBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'lg',
  },
};

export const HasError: Story = {
  args: {
    hasError: true,
    size: 'lg',
  },
};
