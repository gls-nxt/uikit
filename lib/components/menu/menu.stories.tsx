import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Button } from '../button';
import { MenuItem } from '../menuItem';

import { Menu } from './menu';

const meta = {
  args: {
    onSelect: action('onSelect'),
  },
  argTypes: {
    align: {
      control: 'radio',
      description: 'Alignment of the menu relative to the trigger',
      options: ['start', 'center', 'end'],
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: 'string' },
      },
    },
    children: {
      description:
        'React nodes representing a set of MenuGroup, MenuHeading and MenuItems components.',
    },
    className: {
      control: 'text',
      description: 'Custom class names for additional styling.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the Menu content for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    itemProps: {
      control: 'object',
      description: 'Props passed to each MenuItem component for customization.',
    },
    items: {
      control: 'object',
      description: 'Array of menu items.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'array' },
      },
    },
    size: {
      control: 'select',
      description:
        'The size of the MenuItem & MenuHeading if rendered via `items` & `label` properties.',
      options: ['sm', 'lg'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'sm' },
        type: { summary: 'string' },
      },
    },
    trigger: {
      control: false,
      description: 'Custom trigger component',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
  },
  component: Menu,
  parameters: {
    actions: {
      handles: ['select'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=3366-18932&t=FpQPpeOZf6TyyaJ5-1',
    },
    docs: {
      description: {
        component: 'A component for rendering Menu with various styles and options.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Menu',
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: ['Test Item 1', 'Test Item 2', 'Test Item 3'],
    trigger: <Button>Menu</Button>,
  },
};

export const Composition: Story = {
  args: {
    children: (
      <>
        <MenuItem label="Test Item 1" />
        <MenuItem label="Test Item 2" />
        <MenuItem label="Test Item 3" />
      </>
    ),
    trigger: <Button>Menu</Button>,
  },
};

/**
 * Every part of the menu as its own component, for anything the flat props
 * cannot express — a portal container of your own, headings between groups, an
 * item with its own `onSelect`. `Menu.Root` still owns the open state, so the
 * flat form and this one behave identically.
 */
export const Segments: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger>
        <Button>Menu</Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content align="start">
          <Menu.Group>
            <Menu.Heading label="Section" />
            <Menu.Item label="Test Item 1" onSelect={action('onSelect')} />
            <Menu.Item label="Test Item 2" onSelect={action('onSelect')} />
          </Menu.Group>
          <Menu.Item disabled label="Test Item 3" />
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  ),
};
