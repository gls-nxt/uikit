import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './spinner';

const meta = {
  argTypes: {},
  component: Spinner,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?node-id=3310-42844&t=RsEZk5ynTtwz1GZg-4',
    },
    docs: {
      description: {
        component:
          'Spinners are animated indicators used to show that a process or action is currently in progress.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/Spinner',
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: function Render(args) {
    const sizes = ['xl', 'lg', 'md', 'sm', 'xs'] as const;

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(5, max-content)',
          justifyItems: 'center',
        }}
      >
        {sizes.map((size) => (
          <span key={size}>{size}</span>
        ))}
        {sizes.map((size) => (
          <Spinner key={size} {...args} size={size} />
        ))}
      </div>
    );
  },
};

export const Colors: Story = {
  render: function Render(args) {
    const colors = ['primary', 'success', 'warning', 'muted', 'light', 'inverted'] as const;

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(6, max-content)',
          justifyItems: 'center',
        }}
      >
        {colors.map((color) => (
          <span key={color}>{color}</span>
        ))}
        {colors.map((color) => (
          <div
            key={color}
            style={{
              backgroundColor:
                color === 'inverted' ? 'var(--gls-color-surface-primary)' : 'transparent',
              padding: '10px',
            }}
          >
            <Spinner key={color} {...args} color={color} />
          </div>
        ))}
      </div>
    );
  },
};
