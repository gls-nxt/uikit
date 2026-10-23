import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './card';

const meta = {
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the card.',
      required: true,
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom class name for the card.',
      table: {
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Custom data-testid attribute to the card for testing purposes.',
      table: {
        type: { summary: 'string' },
      },
    },
    raised: {
      control: 'boolean',
      description: 'Whether the card should have a shadow effect.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the card, which controls the border-radius.',
      options: ['sm', 'md', 'lg', 'xl'],
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg | xl' },
      },
    },
  },
  component: Card,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=1214-28153&t=IRSPqrHjBgopd5vh-1',
    },
    docs: {
      description: {
        component:
          'A component for displaying content in a card layout. It supports different sizes and custom padding, with an option to add a shadow effect.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Card',
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a Card component',
    raised: true,
    size: 'md',
  },
};
