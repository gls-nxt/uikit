import { RadioGroup } from '@components/radioGroup';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { RadioItem, type RadioItemProps } from './radioItem';

const meta = {
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Custom class for additional styles',
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the Radio item for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the Radio Item is disabled and cannot be interacted with.',
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
  component: RadioItem,
  title: 'Components/Radio/RadioItem',
} satisfies Meta<typeof RadioItem>;

export default meta;

const RadioWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <form>
    <RadioGroup defaultValue="default" orientation="horizontal">
      {children}
    </RadioGroup>
  </form>
);

const Template: StoryObj<RadioItemProps> = {
  render: (args) => (
    <RadioWrapper>
      <RadioItem {...args} />
      <RadioItem {...args} value="non-default" />
    </RadioWrapper>
  ),
};

export const Default: StoryObj<RadioItemProps> = {
  ...Template,
  args: {
    children: 'Default',
    value: 'default',
  },
};
