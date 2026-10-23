import TabsRoot from '@components/TabsRoot';
import { TabsList } from '@components/tabsList';
import { TabsTrigger } from '@components/tabsTrigger';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TabsContent } from './tabsContent';

const meta = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional class name applied to the TabsContent panel.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute on the panel for testing purposes.',
      table: {
        category: 'Testing',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'The value that links this panel to its matching TabsTrigger.',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
  },
  component: TabsContent,
  parameters: {
    docs: {
      description: {
        component:
          'TabsContent renders the panel associated with a TabsTrigger of the same `value`. It must be rendered inside a TabsRoot.',
      },
    },
    layout: 'padded',
  },
  render: (args) => (
    <TabsRoot defaultValue="segment01">
      <TabsList>
        <TabsTrigger value="segment01">Segment 1</TabsTrigger>
        <TabsTrigger value="segment02">Segment 2</TabsTrigger>
      </TabsList>
      <TabsContent {...args} value="segment01">
        Content for segment 1
      </TabsContent>
      <TabsContent value="segment02">Content for segment 2</TabsContent>
    </TabsRoot>
  ),
  title: 'Components/TabsContent',
} satisfies Meta<typeof TabsContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'segment01',
  },
};

export const WithRichContent: Story = {
  args: {
    value: 'segment01',
  },
  render: (args) => (
    <TabsRoot defaultValue="segment01">
      <TabsList>
        <TabsTrigger value="segment01">Overview</TabsTrigger>
        <TabsTrigger value="segment02">Details</TabsTrigger>
      </TabsList>
      <TabsContent {...args} value="segment01">
        <div>
          <h3>Overview</h3>
          <p>
            TabsContent can render arbitrary React children, not just plain text. Use it to host
            forms, tables, or any panel-level layout.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="segment02">
        <div>
          <h3>Details</h3>
          <p>The second panel becomes visible when the matching trigger is activated.</p>
        </div>
      </TabsContent>
    </TabsRoot>
  ),
};
