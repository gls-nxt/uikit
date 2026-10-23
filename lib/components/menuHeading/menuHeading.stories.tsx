import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { MenuGroup } from '../menuGroup';

import { MenuHeading, type MenuHeadingProps } from './menuHeading';

const meta = {
  argTypes: {
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
      description: 'Sets a `data-testid` attribute to the Menu heading for testing purposes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: 'The label for the menu heading.',
      required: true,
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the MenuHeading.',
      options: ['sm', 'lg'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'sm' },
        type: { summary: 'string' },
      },
    },
  },
  component: MenuHeading,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=3366-18932&t=FpQPpeOZf6TyyaJ5-1',
    },
    docs: {
      description: {
        component: 'A component for rendering Menu Heading with various styles and options.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Menu/MenuHeading',
} satisfies Meta<typeof MenuHeading>;

export default meta;

const MenuWrapper: React.FC<{ children: React.ReactNode; size: MenuHeadingProps['size'] }> = ({
  children,
}) => {
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
          <RadixMenu.Content>
            <MenuGroup>{children}</MenuGroup>
          </RadixMenu.Content>
        </RadixMenu.Portal>
      </RadixMenu.Root>
    </div>
  );
};

const Template: StoryObj<MenuHeadingProps> = {
  render: (args) => (
    <MenuWrapper size={args.size}>
      <MenuHeading {...args} />
    </MenuWrapper>
  ),
};

export const Default: StoryObj<MenuHeadingProps> = {
  ...Template,
  args: {
    label: 'Test Heading',
  },
};
