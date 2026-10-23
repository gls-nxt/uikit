import type { Meta, StoryObj } from '@storybook/react-vite';

import { Logo } from './logo';

import styles from './logo.stories.module.css';

const meta = {
  argTypes: {
    allowDarkMode: {
      control: 'boolean',
      description: 'Invert themes based on system preferences if `true`',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    theme: {
      control: 'select',
      description: 'The colour theme of the logo.',
      options: ['light', 'dark'],
      table: {
        defaultValue: { summary: 'light' },
        type: { summary: 'light | dark' },
      },
    },
  },
  component: Logo,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=831-3408&t=bBjS4qJ1kNdIItEz-1',
    },
    docs: {
      description: {
        component: 'A component for rendering Logo with various styles and options.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Logo',
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    allowDarkMode: false,
    theme: 'dark',
  },
  render: function Render(args) {
    return (
      <div className={styles['story-container']}>
        <Logo {...args} />
      </div>
    );
  },
};
export const AllowDarkMode: Story = {
  args: {
    allowDarkMode: true,
    theme: 'dark',
  },
  render: function Render(args) {
    return (
      <div className={`${styles['story-container']} ${styles['allow-dark-mode']}`}>
        <Logo {...args} allowDarkMode />
      </div>
    );
  },
};
