import type { Meta, StoryObj } from '@storybook/react-vite';

import * as Icons from './index';
import { AlertCircleIcon } from './index';

const meta = {
  argTypes: {
    color: {
      control: 'select',
      description: 'The color of the icon',
      options: ['foreground', 'primary', 'success', 'warning', 'error'],
      table: {
        defaultValue: { summary: 'foreground' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the icon',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'string' },
      },
    },
  },
  component: AlertCircleIcon,
  parameters: {
    docs: {
      description: {
        component: `
# Icons

Import icons individually to ensure better tree-shaking:

\`\`\`tsx
import SearchIcon from '@gls-nxt/uikit/icons/search.svg';

<SearchIcon width={24} height={24} />
\`\`\`
        `,
      },
    },
    layout: 'padded',
  },
  title: 'Design System/Icons',
} satisfies Meta<typeof AlertCircleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        padding: '1rem',
      }}
    >
      {Object.entries(Icons)
        .filter(([name]) => name.endsWith('Icon'))
        .map(([name, Icon]) => (
          <div
            key={name}
            style={{
              alignItems: 'center',
              border: '1px solid var(--gls-color-neutrals-200)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              fontSize: '1.5rem',
              gap: '0.5rem',
              padding: '1rem',
            }}
          >
            <Icon />
            <code
              style={{
                fontSize: '0.875rem',
                textAlign: 'center',
                width: '100%',
                wordBreak: 'break-word',
              }}
            >
              {name}
            </code>
          </div>
        ))}
    </div>
  ),
};
