import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import InformationBox from './informationBox';

const meta = {
  args: {
    onClose: action('onClose'),
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Custom content inside the Info Box.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description:
        'Custom class name for styling the information box. This allows for additional custom styling beyond what is provided by default.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    closeButton: {
      control: 'boolean',
      description: 'Whether the Info Box should have a close button.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    color: {
      control: 'select',
      description: 'The color variant of the Info Box.',
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'warning', 'success'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
        type: { summary: 'string' },
      },
    },

    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the information box for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'The description of the Info Box.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },

    fullWidth: {
      control: 'boolean',
      description: 'Whether the Info Box should take up the full width of its container.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    minWidth: {
      control: 'number',
      description: 'Optional minimum width of the Info Box.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    prefix: {
      control: 'text',
      description: 'The prefix of the Info Box.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode | string' },
      },
    },
    title: {
      control: 'text',
      description: 'The title of the Info Box.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
    visible: {
      control: 'boolean',
      description: 'Whether the Info Box should be visible.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
  },
  component: InformationBox,
  parameters: {
    actions: {
      handles: ['click', 'focus', 'blur'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=3338-11168',
    },
    docs: {
      description: {
        component: 'A component for rendering a information box with various styles and options.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/Information Box',
} satisfies Meta<typeof InformationBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: 'This is an infobox with a description',
    title: 'Info Box',
  },
};
