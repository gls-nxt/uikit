import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Switch } from './switch';

const meta = {
  args: {
    onCheckedChange: action('onCheckedChange'),
    size: 'md',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the Checkbox is checked.',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Custom class for additional styles',
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the Checkbox item for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the Checkbox is disabled and cannot be interacted with.',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: { type: 'select' },
      description: 'Size of the Switch component.',
      options: ['sm', 'md'],
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: "'sm' | 'md'" },
      },
    },
    value: {
      control: 'text',
      description: 'The value given as data when submitted with a `name`.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
  },
  component: Switch,
  parameters: {
    actions: {
      handles: ['onCheckedChange'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=1185-19754&t=FtSIoVlqlLRoIQqw-1',
    },
    docs: {
      description: {
        component: 'Switch component using Radix UI.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/Switch',
} satisfies Meta<typeof Switch>;

export default meta;

const Template: StoryObj<typeof meta> = {
  render: ({ children, ...args }) => (
    <form>
      <Switch {...args}>{children}</Switch>
    </form>
  ),
};

export const Default: StoryObj<typeof meta> = {
  ...Template,
  args: {
    children: 'Default',
    value: 'default',
  },
};
export const Small: StoryObj<typeof meta> = {
  ...Template,
  args: {
    children: 'Small',
    size: 'sm',
  },
};
