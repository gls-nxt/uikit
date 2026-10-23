import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SVGProps } from 'react';
import { action } from 'storybook/actions';

import { IconButton } from './iconButton';

const SampleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M15.707 5.293a1 1 0 0 1 0 1.414L10.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const meta = {
  args: {
    label: 'label',
    onClick: action('onClick'),
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      description:
        'Change the default rendered element for the one passed as a child, merging their props and behavior.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    children: {
      control: 'text',
      description: 'The element shown instead of <button> when asChild is true.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactElement' },
      },
    },
    className: {
      control: 'text',
      description:
        'Custom class name for styling the button. This allows for additional custom styling beyond what is provided by default.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'select',
      description: 'The color variant of the button.',
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'blurred', 'ghost'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the button for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled and cannot be interacted with.',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    icon: {
      control: 'text',
      description: 'An icon to display on the button.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is loading and cannot be interacted with.',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    shape: {
      control: 'select',
      description: 'The shape of the button.',
      options: ['round', 'square'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'round' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the button.',
      options: ['lg', 'md', 'sm', 'xs'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
        type: { summary: 'string' },
      },
    },
  },
  component: IconButton,
  parameters: {
    actions: {
      handles: ['click', 'focus', 'blur'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?node-id=1185-16990&t=dbmKK9xeDvxTDshu-4',
    },
    docs: {
      description: {
        component: 'Icon Buttons are buttons, that only contain of icons',
      },
    },
    layout: 'padded',
  },
  title: 'Components/IconButton',
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <SampleIcon />,
  },
};

export const SquareShape: Story = {
  args: {
    icon: <SampleIcon />,
    shape: 'square',
  },
};

export const Sizes: Story = {
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
          <IconButton key={size} {...args} icon={<SampleIcon />} size={size} />
        ))}
        {sizes.map((size) => (
          <IconButton key={size} {...args} icon={<SampleIcon />} shape="square" size={size} />
        ))}
      </div>
    );
  },
};

export const Colors: Story = {
  render: function Render(args) {
    const colors = ['primary', 'secondary', 'tertiary', 'destructive', 'blurred', 'ghost'] as const;

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
        {colors.map((color) => {
          const button = <IconButton {...args} color={color} icon={<SampleIcon />} key={color} />;

          return color === 'blurred' ? (
            <div
              key={color}
              style={{ backgroundColor: 'var(--gls-color-surface-primary)', padding: '10px' }}
            >
              {button}
            </div>
          ) : (
            button
          );
        })}
        {colors.map((color) => {
          const button = (
            <IconButton key={color} {...args} color={color} icon={<SampleIcon />} shape="square" />
          );

          return color === 'blurred' ? (
            <div
              key={color}
              style={{ backgroundColor: 'var(--gls-color-surface-primary)', padding: '10px' }}
            >
              {button}
            </div>
          ) : (
            button
          );
        })}
      </div>
    );
  },
};

export const Disabled: Story = {
  ...Colors,
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  ...Colors,
  args: {
    loading: true,
  },
};

export const AsLink: Story = {
  render: function Render(args) {
    return (
      <IconButton {...args} asChild icon={<SampleIcon />}>
        <a href="https://example.com">Go to example.com</a>
      </IconButton>
    );
  },
};
