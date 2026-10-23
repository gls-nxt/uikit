import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Textarea } from './textarea';

const meta = {
  args: {
    onBlur: action('onBlur'),
    onChange: action('onChange'),
    onFocus: action('onFocus'),
  },
  argTypes: {
    className: {
      control: 'text',
      description:
        'Custom class name for styling the textarea. This allows for additional custom styling beyond what is provided by default.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the textarea for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Display the textarea in an error state.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to be displayed below the textarea.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make the textarea take up the full width of its container.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the textarea.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'React.ReactNode' },
      },
    },
    label: {
      control: 'text',
      description: 'Floating label for the textarea.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    labelClassName: {
      control: 'text',
      description:
        'Custom class name for styling the textarea label. This allows for additional custom styling beyond what is provided by default.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    onChange: {
      description:
        'Callback fired when the value is changed. (Not directly controllable in Storybook)',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: '(event: React.ChangeEvent<HTMLTextAreaElement>) => void' },
      },
    },
    resize: {
      control: 'select',
      description: 'Controls whether and how the textarea can be resized by the user.',
      options: ['none', 'vertical', 'both'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'vertical' },
        type: { summary: 'string' },
      },
    },
  },
  component: Textarea,
  parameters: {
    actions: {
      handles: ['change', 'focus', 'blur'],
    },
    docs: {
      description: {
        component:
          'A component for rendering a multiline textarea with various styles and options.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Textarea',
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'data-testid': 'custom-test-id',
    label: 'Default Textarea',
  },
  parameters: {
    layout: 'padded',
  },
};

export const HelperText: Story = {
  args: {
    'data-testid': 'custom-test-id',
    helperText: 'You need this help babe',
    label: 'Textarea field',
  },
  parameters: {
    layout: 'padded',
  },
};

export const ErrorMessage: Story = {
  args: {
    'data-testid': 'custom-test-id',
    error: true,
    errorMessage: 'Oh dear you oopsied',
    label: 'Textarea field',
  },
  parameters: {
    layout: 'padded',
  },
};

export const ErrorWithHelperText: Story = {
  args: {
    'data-testid': 'custom-test-id',
    error: true,
    errorMessage: 'Don\u2019t be a dummy',
    helperText: 'I\u2019m trying to help you',
    label: 'Textarea field',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Disabled: Story = {
  args: {
    'data-testid': 'custom-test-id',
    disabled: true,
    label: 'Disabled Textarea',
  },
  parameters: {
    layout: 'padded',
  },
};

export const ResizeNone: Story = {
  args: {
    'data-testid': 'custom-test-id',
    label: 'Non-resizable Textarea',
    resize: 'none',
  },
  parameters: {
    layout: 'padded',
  },
};

export const ResizeBoth: Story = {
  args: {
    'data-testid': 'custom-test-id',
    label: 'Freely Resizable Textarea',
    resize: 'both',
  },
  parameters: {
    layout: 'padded',
  },
};

export const FullWidth: Story = {
  args: {
    'data-testid': 'custom-test-id',
    fullWidth: true,
    label: 'Full Width Textarea',
  },
  parameters: {
    layout: 'padded',
  },
};
