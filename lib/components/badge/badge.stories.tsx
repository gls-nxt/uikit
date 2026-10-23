import { DotIcon, HeartIcon } from '@icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Badge from './badge';

const meta = {
  argTypes: {
    className: {
      control: 'text',
      description: 'This allows for additional custom styling',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'select',
      description: 'The color variant of the badge',
      options: ['blue', 'light-blue', 'grey', 'white', 'orange', 'green', 'red'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'blue' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the badge',
      options: ['lg', 'md', 'sm', 'xs'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
        type: { summary: 'string' },
      },
    },
    willReceiveUpdates: {
      control: 'boolean',
      description: 'Indicates if the badge content will change dynamically',
      table: {
        defaultValue: { summary: 'none' },
        type: { summary: 'boolean' },
      },
    },
  },
  component: Badge,
  parameters: {
    actions: {
      handles: ['click', 'focus', 'blur'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?node-id=1185-22061&m=dev',
    },
    docs: {
      description: {
        component: 'Badge component for displaying status or short information.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/Badge',
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    willReceiveUpdates: true,
  },
};

export const Colors: Story = {
  ...Default,

  render: function Render(args) {
    const colors = ['blue', 'light-blue', 'grey', 'white', 'orange', 'green', 'red'] as const;

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(7, max-content)',
          justifyItems: 'center',
          textTransform: 'capitalize',
        }}
      >
        {colors.map((color) => (
          <Badge key={color} {...args} color={color}>
            {color}
          </Badge>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  ...Default,

  render: function Render(args) {
    const sizes = ['lg', 'md', 'sm', 'xs'] as const;

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(4, max-content)',
          justifyItems: 'center',
        }}
      >
        {sizes.map((size) => (
          <span key={size}>{size}</span>
        ))}
        {sizes.map((size) => (
          <Badge key={size} {...args} size={size}>
            Bananas
          </Badge>
        ))}
      </div>
    );
  },
};

export const Icons: Story = {
  args: {
    children: (
      <>
        <DotIcon />
        Badge
        <HeartIcon style={{ color: 'pink' }} />
      </>
    ),
  },
};
