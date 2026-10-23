import { Button } from '@components/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Tooltip } from './tooltip';

const meta = {
  args: {
    onOpenChange: action('onOpenChange'),
  },
  argTypes: {
    align: {
      control: 'radio',
      description: 'The preferred alignment against the trigger. May change when collisions occur.',
      options: ['start', 'center', 'end'],
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'center' },
        type: { summary: 'string' },
      },
    },
    arrowClassName: {
      control: 'text',
      description: 'Custom class names for additional arrow styling.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    children: {
      control: 'text',
      description: 'The content of the tooltip component.',
      required: true,
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom class names for additional styling.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    customWidth: {
      control: 'number',
      description:
        'Custom maxWidth of the tooltip component. That can be used to override the variable width.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Data attribute for testing purposes.',
      table: {
        category: 'Testing',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    delayDuration: {
      control: 'number',
      description: 'The delay duration of the tooltip component.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '150' },
        type: { summary: 'number' },
      },
    },
    heading: {
      control: 'text',
      description:
        'The heading of the tooltip component. When provided, the text alignment will change to align left',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
    onOpenChange: {
      control: false,
      description: 'The callback function that is called when the tooltip state changes.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: '(open: boolean) => void' },
      },
    },
    side: {
      control: { type: 'radio' },
      description:
        'The preferred side of the trigger to render against when open. Will be reversed when collisions occur and `avoidCollisions` is enabled.',
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'top' },
        type: { summary: 'string' },
      },
    },
    trigger: {
      control: false,
      description: 'Custom trigger component',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
    width: {
      control: 'select',
      description: 'The max width of the tooltip component.',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
        type: { summary: 'string' },
      },
    },
  },
  component: Tooltip,
  parameters: {
    actions: {
      handles: ['select'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=1185-22709&t=H47sjffB4OOh2m7j-1',
    },
    docs: {
      description: {
        component: 'A component for rendering Tooltip with various styles and options.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Tooltip',
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tooltip Content',
    trigger: <Button size="md">Tooltip</Button>,
  },
};
