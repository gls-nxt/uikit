import { RadioItem } from '@components/radioItem';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { RadioGroup } from './radioGroup';

const meta = {
  args: {
    onValueChange: action('onValueChange'),
  },
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Custom class for additional styles',
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the Radio group for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description:
        'The value of the Radio Item that should be checked when initially rendered. Use when you do not need to control the state of the radio items.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the Radio Group is disabled and cannot be interacted with.',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    name: {
      control: 'text',
      description:
        'The name of the group. Submitted with its owning form as part of a name/value pair.',
      table: {
        category: 'State',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    orientation: {
      control: 'radio',
      description: 'The orientation of the Raiod Group.',
      options: ['horizontal', 'vertical'],
      table: {
        category: 'State',
        defaultValue: { summary: 'vertical' },
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description:
        'The controlled value of the Radio Item to check. Should be used in conjunction with `onValueChange`.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
  },
  component: RadioGroup,
  parameters: {
    actions: {
      handles: ['onValueChange'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=1185-19582&t=ncrOitiBY2SoWn3r-1',
    },
    docs: {
      description: {
        component: 'Radio Group component using Radix UI.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/Radio/RadioGroup',
} satisfies Meta<typeof RadioGroup>;

export default meta;

const Template: StoryObj<typeof meta> = {
  render: (args) => (
    <form>
      <RadioGroup {...args} />
    </form>
  ),
};

export const Default: StoryObj<typeof meta> = {
  ...Template,
  args: {
    options: ['Item 1', 'Item 2', 'Item 3'],
  },
};

export const Composition: StoryObj<typeof meta> = {
  ...Template,
  args: {
    children: (
      <>
        <RadioItem value="1">Item 1</RadioItem>
        <RadioItem value="2">Item 2</RadioItem>
        <RadioItem value="3">Item 3</RadioItem>
      </>
    ),
  },
};
