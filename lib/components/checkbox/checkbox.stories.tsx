import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Checkbox } from './checkbox';

const meta = {
  args: {
    onChange: action('onChange'),
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
    disabled: {
      control: 'boolean',
      description: 'Whether the Checkbox is disabled and cannot be interacted with.',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
  component: Checkbox,
  parameters: {
    actions: {
      handles: ['onChange'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=438-576&t=gEkSI1GiFpPwZm8j-1',
    },
    docs: {
      description: {
        component: 'Checkbox component',
      },
    },
    layout: 'padded',
  },
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>;

export default meta;

const Template: StoryObj<typeof meta> = {
  render: ({ children, ...args }) => (
    <form>
      <Checkbox defaultValue="default" {...args}>
        {children}
      </Checkbox>
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

export const Long: StoryObj<typeof meta> = {
  ...Template,
  args: {
    alignTop: true,
    children:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ',
    value: 'accept',
  },
};

export const ErrorState: StoryObj<typeof meta> = {
  ...Template,
  args: {
    children: 'What you doing?',
    error: true,
    errorMessage: 'This is an error message',
    value: 'test',
  },
};
