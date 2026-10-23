import { InfoIcon, SearchIcon, XIcon } from '@icons';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonHTMLAttributes, ComponentProps } from 'react';
import { useId } from 'react';
import { action } from 'storybook/actions';

import { Button } from '../button';
import { Popover } from '../popover';

import { Input } from './input';

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
        'Custom class name for styling the input. This allows for additional custom styling beyond what is provided by default.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the input for testing purposes.',
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
    error: {
      control: 'boolean',
      description: 'Display the input field in an error state.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Pass error message to be displayed below the input field.',
      table: {
        defaultValue: { summary: 'This is not valid' },
        type: { summary: 'string' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make the input field take up the full width of its container.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input field.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'React.ReactNode' },
      },
    },
    label: {
      control: 'text',
      description: 'Label for the input field.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    labelClassName: {
      control: 'text',
      description:
        'Custom class name for styling the input label. This allows for additional custom styling beyond what is provided by default.',
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
        type: { summary: '(event: React.ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the input field.',
      options: ['lg', 'sm'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'lg' },
        type: { summary: 'string' },
      },
    },
    slots: {
      control: 'object',
      description: 'Custom components to be used in place of default HTML elements.',
      table: {
        defaultValue: { summary: '{}' },
        type: {
          summary: '{ suffix?: ReactElement | string, prefix?: ReactElement | string }',
        },
      },
    },
  },
  component: Input,
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
    layout: 'centered',
  },
  render: InputStory,
  title: 'Components/Input',
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;
type InputStoryArgs = Partial<ComponentProps<typeof Input>>;

const IconButton = ({
  children,
  ...props
}: { children: React.ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    style={{
      alignItems: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      padding: 0,
    }}
    type="button"
    {...props}
  >
    {children}
  </button>
);

function InputStory({
  className,
  error = false,
  errorMessage,
  fullWidth = false,
  helperText,
  label,
  labelClassName,
  slots = {},
  size,
  ...controlProps
}: InputStoryArgs) {
  const { id, required, ...inputProps } = controlProps;
  const generatedId = useId();

  return (
    <Input.Root
      className={className}
      error={error}
      fullWidth={fullWidth}
      id={id ?? generatedId}
      labelled={Boolean(label)}
      required={required}
      size={size}
    >
      <Input.Field>
        {slots?.prefix ? <Input.Prefix>{slots.prefix}</Input.Prefix> : null}
        <Input.Main>
          <Input.Control {...inputProps} />
          {label ? <Input.Label className={labelClassName}>{label}</Input.Label> : null}
        </Input.Main>
        {slots?.suffix ? <Input.Suffix>{slots.suffix}</Input.Suffix> : null}
      </Input.Field>
      {helperText ? <Input.HelperText>{helperText}</Input.HelperText> : null}
      {/* Live region must exist from first render so screen readers announce changes */}
      <Input.ErrorMessage>{errorMessage}</Input.ErrorMessage>
    </Input.Root>
  );
}

export const Default: Story = {
  args: {
    'data-testid': 'custom-test-id',
    label: 'Default Input',
    size: 'lg',
  },
  parameters: {
    layout: 'padded',
  },
};

export const HelperText: Story = {
  args: {
    'data-testid': 'custom-test-id',
    helperText: 'Use your work email address.',
    id: 'input-helper-text',
    label: 'Input field',
    size: 'lg',
  },
  parameters: {
    layout: 'padded',
  },
};

export const ErrorMessage: Story = {
  args: {
    'data-testid': 'custom-test-id',
    error: true,
    errorMessage: 'This field is required.',
    id: 'input-error-message',
    label: 'Input field',
    size: 'lg',
  },
  parameters: {
    layout: 'padded',
  },
};

export const ErrorWithHelperText: Story = {
  args: {
    'data-testid': 'custom-test-id',
    error: true,
    errorMessage: 'Enter a valid email address.',
    helperText: 'Use your work email address.',
    id: 'input-error-with-helper-text',
    label: 'Input field',
    size: 'lg',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithSearchIcon: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Search Input',
    slots: {
      prefix: <SearchIcon aria-hidden="true" size="sm" />,
    },
  },
};

export const WithPopover: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Input with Info',
    slots: {
      suffix: (
        <Popover
          side="right"
          trigger={
            <IconButton aria-label="More info">
              <InfoIcon size="sm" />
            </IconButton>
          }
        >
          This popover stays open when clicked
        </Popover>
      ),
    },
  },
};

export const WithInteractiveButtons: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Input with Actions',
    slots: {
      prefix: <SearchIcon aria-hidden="true" size="sm" />,
      suffix: (
        <Button onClick={action('clear-click')} size="sm">
          Clear
        </Button>
      ),
    },
  },
};

export const WithClearButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Clearable Input',
    slots: {
      suffix: (
        <IconButton aria-label="Clear icon">
          <XIcon size="sm" />
        </IconButton>
      ),
    },
  },
};

export const CustomLabelStyle: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Custom Label Style',
    labelClassName: 'custom-label-style',
  },
};
