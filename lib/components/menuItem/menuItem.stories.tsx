import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { MenuItem, type MenuItemProps } from './menuItem';

const meta = {
  argTypes: {
    adornmentClassName: {
      control: 'text',
      description: 'Custom class names for adornments (prefix/suffix).',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
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
      description: 'Sets a `data-testid` attribute to the Menu item for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the Menu Item is disabled and cannot be interacted with.',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: 'text',
      description: 'The label for the menu item.',
      required: true,
      table: {
        type: { summary: 'string' },
      },
    },
    prefix: {
      control: 'text',
      description: 'An optional prefix element rendered before the item.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the MenuItem.',
      options: ['sm', 'lg'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'sm' },
        type: { summary: 'string' },
      },
    },
    suffix: {
      control: 'text',
      description: 'An optional suffix element rendered after the item.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
  },
  component: MenuItem,
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
        component: 'A component for rendering Menu Item with various styles and options.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Menu/MenuItem',
} satisfies Meta<typeof MenuItem>;

export default meta;

const MenuWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ height: '100px', overflow: 'hidden', position: 'relative' }}>
    <RadixMenu.Root modal={false} open>
      <RadixMenu.Trigger asChild>
        <VisuallyHidden>
          <button type="button">test</button>
        </VisuallyHidden>
      </RadixMenu.Trigger>
      <RadixMenu.Content>{children}</RadixMenu.Content>
    </RadixMenu.Root>
  </div>
);

const Template: StoryObj<MenuItemProps> = {
  render: (args) => (
    <MenuWrapper>
      <MenuItem {...args} />
    </MenuWrapper>
  ),
};

export const Default: StoryObj<MenuItemProps> = {
  ...Template,
  args: {
    label: 'Test Item',
  },
};
