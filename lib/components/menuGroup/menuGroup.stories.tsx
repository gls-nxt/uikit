import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { MenuHeading } from '../menuHeading';
import { MenuItem } from '../menuItem';

import { MenuGroup } from './menuGroup';

const meta = {
  argTypes: {
    children: {
      description: 'React nodes representing a set of MenuHeading and MenuItems components.',
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
      description: 'Sets a `data-testid` attribute to the Menu group for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    headingProps: {
      control: 'object',
      description:
        'Props passed to the MenuHeading component, allowing customization of the heading.',
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
    label: {
      control: 'text',
      description: 'The label for the menu group.',
      required: true,
      table: {
        type: { summary: 'string' },
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
  },
  component: MenuGroup,
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
        component: 'A component for rendering Menu Group with various styles and options.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Menu/MenuGroup',
} satisfies Meta<typeof MenuGroup>;

export default meta;

const MenuWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div ref={setContainer} style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
      <RadixMenu.Root modal={false} open>
        <RadixMenu.Trigger asChild>
          <VisuallyHidden>
            <button type="button">test</button>
          </VisuallyHidden>
        </RadixMenu.Trigger>
        <RadixMenu.Portal container={container}>
          <RadixMenu.Content>{children}</RadixMenu.Content>
        </RadixMenu.Portal>
      </RadixMenu.Root>
    </div>
  );
};

const Template: StoryObj<typeof meta> = {
  render: (args) => (
    <MenuWrapper>
      <MenuGroup {...args} />
    </MenuWrapper>
  ),
};

export const Default: StoryObj<typeof meta> = {
  ...Template,
  args: {
    items: ['Test Item 1', 'Test Item 2', 'Test Item 3'],
    label: 'Test Heading',
    size: 'sm',
  },
};

export const Composition: StoryObj<typeof meta> = {
  ...Template,
  args: {
    children: (
      <>
        <MenuHeading label="Test Heading" />
        <MenuItem label="Test Item 1" />
        <MenuItem label="Test Item 2" />
        <MenuItem label="Test Item 3" />
      </>
    ),
    size: 'sm',
  },
};
