import type { Meta, StoryObj } from '@storybook/react-vite';

import Tabs from './tabs';

const meta = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional class name for the TabsRoot',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the Tabs for testing purposes.',
      table: {
        category: 'Testing',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'The default value of the Tabs',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'tab1' },
        type: { summary: 'string' },
      },
    },

    fullWidth: {
      control: 'boolean',
      description: 'Changes the width of the TabsList to 100%',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    items: {
      control: 'object',
      description: 'The items of the Tabs',
      table: {
        category: 'Content',
        defaultValue: { summary: '{}' },
        type: { summary: 'TabItem[]' },
      },
    },
    size: {
      control: 'select',
      description: 'Changes the size of the size of the TabsList',
      options: ['small', 'large'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'small' },
        type: { summary: 'small | large' },
      },
    },
    tabsContentProps: {
      control: 'object',
      description: 'Additional props that are passed to all of the TabsContent',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '{}' },
        type: { summary: 'object' },
      },
    },
    tabsListProps: {
      control: 'object',
      description: 'Additional props for the TabsList',
      table: { category: 'Behavior', defaultValue: { summary: '{}' }, type: { summary: 'object' } },
    },

    tabsTriggerProps: {
      control: 'object',
      description: 'Additional props that are passed to all of the TabsTrigger',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '{}' },
        type: { summary: 'object' },
      },
    },
  },
  component: Tabs,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=1001-6374&t=3HmS9IWqNO9k2dhA-1',
    },
    docs: {
      description: {
        component:
          'TabsList component is used to render a list of tabs in different sizes and widths.',
      },
    },
    layout: 'padded',
  },
  render: (args) => {
    return <Tabs {...args} />;
  },
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'data-testid': 'test-tabs',
    defaultValue: 'tab1',
    items: [
      {
        content: 'Content for tab 1 ',
        label: 'Tab',
        value: 'tab1',
      },
      {
        content: 'Content for tab 2',
        label: 'Tab',
        value: 'tab2',
      },
      {
        content: 'Content for tab 3',
        label: 'Tab',
        value: 'tab3',
      },
    ],
    size: 'small',
  },
};
