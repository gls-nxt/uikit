import { UmbrellaIcon } from '@icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ComboboxItem } from './comboboxItem';

const meta = {
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the combobox item.',
      required: true,
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      control: 'text',
      description:
        'Custom class name for styling the combobox item. This allows for additional custom styling beyond what is provided by default.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox item is disabled and cannot be interacted with.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  component: ComboboxItem,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?node-id=1325-26433&node-type=frame&t=nq1T1KcBhWSL314j-0',
    },
    docs: {
      description: {
        component:
          'Simple component to display items in a combobox. Any elements can be used as children, allowing for flexible content.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Combobox Item',
} satisfies Meta<typeof ComboboxItem>;

export default meta;

type Story = StoryObj<typeof ComboboxItem>;

export const Default: Story = {
  render: function Render(args) {
    return <ComboboxItem {...args}>Combobox Item</ComboboxItem>;
  },
};

export const WithPrefix: Story = {
  render: function Render() {
    return <ComboboxItem>🇫🇮 Finland</ComboboxItem>;
  },
};

export const WithSuffix: Story = {
  render: function Render() {
    return (
      <ComboboxItem>
        Umbrella
        <UmbrellaIcon />
      </ComboboxItem>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    return <ComboboxItem disabled>Disabled Item</ComboboxItem>;
  },
};

export const WithCustomClassName: Story = {
  render: function Render() {
    return <ComboboxItem className="custom-class">Item with custom class</ComboboxItem>;
  },
};
