import { TrashIcon } from '@icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { Button } from './button';

// Sample icon component
const SampleIcon = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      fill="currentColor"
    />
  </svg>
);

const meta = {
  args: {
    onClick: action('onClick'),
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content inside the button.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Button' },
        type: { summary: 'string | ReactNode' },
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
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'blurred'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
        type: { summary: 'string' },
      },
    },
    component: {
      control: 'text',
      description: 'The HTML element or React component to use as the root node.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'button' },
        type: { summary: 'React.ElementType' },
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
    endIcon: {
      control: 'text',
      description: 'An optional icon to display at the end of the button.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take up the full width of its container.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    href: {
      control: 'text',
      description:
        'The URL to link to when the button is clicked. If defined, an `a` element will be used.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
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
    loadingMessage: {
      control: 'text',
      description: 'The text shown instead of children when loading is true',
      table: {
        category: 'State',
        defaultValue: { summary: 'undefined' },
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
    startIcon: {
      control: 'text',
      description: 'An optional icon to display at the start of the button.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
  },
  component: Button,
  parameters: {
    actions: {
      handles: ['click', 'focus', 'blur'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=324-363&t=MaIbpCvmWVijmikQ-1',
    },
    docs: {
      description: {
        component: 'A component for rendering button with various styles and options.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/Button',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click Me',
  },
};

export const WithIcons: Story = {
  ...Default,
  args: {
    ...Default.args,
    endIcon: <SampleIcon />,
    startIcon: <SampleIcon />,
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
          <Button key={size} {...args} endIcon={<TrashIcon />} size={size} />
        ))}
      </div>
    );
  },
};

export const Colors: Story = {
  ...Default,

  render: function Render(args) {
    const colors = ['primary', 'secondary', 'tertiary', 'destructive', 'blurred'] as const;

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
        {colors.map((color) => (
          <span key={color}>{color}</span>
        ))}
        {colors.map((color) => {
          const button = <Button {...args} color={color} key={color} />;

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
    ...Colors.args,
    disabled: true,
  },
};

export const Loading: Story = {
  ...Colors,

  args: {
    ...Colors.args,
    loading: true,
    loadingMessage: 'Loading…',
  },
};

export const AsLink: Story = {
  render: function Render(args) {
    return (
      <Button {...args} asChild startIcon={<SampleIcon />}>
        <a href="/">Go to homepage</a>
      </Button>
    );
  },
};
