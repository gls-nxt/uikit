import Button from '@components/button';
import { Toaster } from '@components/toaster/toaster';
import { useToast } from '@components/use-toast';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  args: {},
  argTypes: {
    duration: {
      control: 'number',
      description: 'The lifetime duration of the toast in milliseconds.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '5000' },
        type: { summary: 'number' },
      },
    },
    swipeThreshold: {
      control: 'number',
      description: 'The threshold for the swipe gesture to dismiss the toast.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '20' },
        type: { summary: 'number' },
      },
    },
    viewportProps: {
      control: 'object',
      description:
        'The props for the ToastViewport component including custom class name and data-testId. You can read more about the viewport props [here](https://www.radix-ui.com/primitives/docs/components/toast#api-reference).',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'object' },
      },
    },
  },
  component: Toaster,
  parameters: {
    actions: {
      handles: ['click', 'focus', 'blur'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=3338-7960',
    },
    docs: {
      description: {
        component:
          "The Toaster Component is the provider for all the toast components. It renders out all currently available toasts it's usually used in the root of the application.",
      },
      story: {
        iframeHeight: 400,
        inline: false,
      },
    },
    layout: 'padded',
  },
  title: 'Components/Toaster',
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function ToasterStory() {
    const { toast } = useToast();

    return (
      <div>
        <Button
          onClick={() =>
            toast({
              description: 'Friday, February 10, 2018 at 5:57 PM',
              title: 'Scheduled: Catch up',
            })
          }
        >
          Show toast
        </Button>
        <Toaster duration={Number.POSITIVE_INFINITY} />
      </div>
    );
  },
};
