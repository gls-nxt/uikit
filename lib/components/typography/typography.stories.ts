import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from './typography';

const meta = {
  argTypes: {
    as: {
      control: 'select',
      description: 'The HTML tag to use for the typography.',
      options: [undefined, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'label', 'p'],
      table: {
        defaultValue: { summary: 'span' },
        type: { summary: 'keyof JSX.IntrinsicElements' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the typography.',
      required: true,
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      control: 'text',
      description:
        'Custom class name for styling the typography. This allows for additional custom styling beyond what is provided by default.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'select',
      description: 'The color of the typography.',
      options: [
        'label',
        'foreground',
        'inverted',
        'light',
        'muted',
        'primary',
        'primary-hover',
        'primary-muted',
        'success',
        'success-light',
        'error',
        'error-muted',
        'warning',
      ],
      table: {
        defaultValue: { summary: 'foreground' },
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the typography for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    fontWeight: {
      control: 'select',
      description: 'The font weight of the typography.',
      options: ['regular', 'medium', 'semibold', 'bold'],
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | medium | semibold | bold' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the typography.',
      options: [1, 2, 3, 4, 5, 6],
      table: {
        defaultValue: { summary: '2' },
        type: { summary: '1 | 2 | 3 | 4 | 5 | 6' },
      },
    },
    variant: {
      control: 'select',
      description: 'The variant of typography.',
      options: ['heading', 'body', 'label'],
      table: {
        defaultValue: { summary: 'body' },
        type: { summary: 'heading | body | label' },
      },
    },
  },
  component: Typography,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=831-3408&t=bBjS4qJ1kNdIItEz-1',
    },
    docs: {
      description: {
        component: 'A component for rendering typography with various styles and options.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: 'span',
    children: 'This is a Typography component',
    color: 'foreground',
    fontWeight: 'regular',
    size: 2,
    variant: 'body',
  },
};
