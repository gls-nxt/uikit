import { Button } from '@components/button';
import { Toaster } from '@components/toaster/toaster';
import { useToast } from '@components/use-toast';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toast } from './toast';

const SampleIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_5681_3554)">
      <g clipPath="url(#clip1_5681_3554)">
        <path
          clipRule="evenodd"
          d="M10 2.50004C5.8579 2.50004 2.50004 5.8579 2.50004 10C2.50004 14.1422 5.8579 17.5 10 17.5C14.1422 17.5 17.5 14.1422 17.5 10C17.5 5.8579 14.1422 2.50004 10 2.50004ZM0.833374 10C0.833374 4.93743 4.93743 0.833374 10 0.833374C15.0626 0.833374 19.1667 4.93743 19.1667 10C19.1667 15.0626 15.0626 19.1667 10 19.1667C4.93743 19.1667 0.833374 15.0626 0.833374 10Z"
          fill="white"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M9.99996 9.16663C10.4602 9.16663 10.8333 9.53972 10.8333 9.99996V13.3333C10.8333 13.7935 10.4602 14.1666 9.99996 14.1666C9.53972 14.1666 9.16663 13.7935 9.16663 13.3333V9.99996C9.16663 9.53972 9.53972 9.16663 9.99996 9.16663Z"
          fill="white"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M9.16663 6.66671C9.16663 6.20647 9.53972 5.83337 9.99996 5.83337H10.0083C10.4685 5.83337 10.8416 6.20647 10.8416 6.66671C10.8416 7.12694 10.4685 7.50004 10.0083 7.50004H9.99996C9.53972 7.50004 9.16663 7.12694 9.16663 6.66671Z"
          fill="white"
          fillRule="evenodd"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_5681_3554">
        <rect fill="white" height="20" width="20" />
      </clipPath>
      <clipPath id="clip1_5681_3554">
        <rect fill="white" height="20" width="20" />
      </clipPath>
    </defs>
  </svg>
);

const meta = {
  args: {},
  argTypes: {
    action: {
      control: 'object',
      description: 'An additional action that can be displayed on the toast.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ToastProps["action"]' },
      },
    },
    allowSwiping: {
      control: 'boolean',
      description:
        'Enable or disable the swipe to close behavior. This should be used consciously as it can affect the UX.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    className: {
      control: 'text',
      description: 'An additional className for the root of our toast.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    close: {
      control: 'boolean',
      description: 'Whether the toast should be closable via a close button.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the toast for testing purposes.',
      table: {
        category: 'Testing',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'The description of the toast.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    duration: {
      control: 'number',
      description: 'The lifetime duration of the toast in milliseconds`.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '5000' },
        type: { summary: 'number' },
      },
    },
    id: {
      control: false,
    },
    prefix: {
      control: 'text',
      description: 'The prefix of the toast.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'React.ReactNode' },
      },
    },
    preserve: {
      control: 'boolean',
      description: 'Whether the toast should be dismissed automatically.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    title: {
      control: 'text',
      description: 'The title of the toast.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
  component: Toast,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?m=auto&node-id=3338-7960',
    },
    docs: {
      description: {
        component: 'The Toast component is used to display a toast message to the user.',
      },
      story: {
        iframeHeight: 400,
        inline: false,
      },
    },
    layout: 'padded',
  },
  title: 'Components/Toast',
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

const Template: Story = {
  render: function ToastStory(args) {
    const { toast } = useToast();

    return (
      <div>
        <Toaster />
        <Button onClick={() => toast(args)}>Show toast</Button>
      </div>
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    action: {
      altText: 'Undo',
      label: 'Undo',
      onClick: () => console.log('Undo'),
    },
    close: true,
    description: 'This is a toast message description',
    title: 'This is a toast message',
  },
};

export const WithPrefix: Story = {
  ...Template,
  args: {
    close: true,
    description: 'This is a toast message description',
    prefix: <SampleIcon />,
    title: 'This is a toast message',
  },
};

export const PromiseToast: Story = {
  render: function PromiseToastStory() {
    const { toast } = useToast();

    const promise = () =>
      new Promise((resolve) => setTimeout(() => resolve({ title: 'Success' }), 2000));

    return (
      <div>
        <Toaster />
        <Button
          onClick={() =>
            toast.promise(promise(), {
              error: { title: 'Error' },
              pending: {
                description: 'You can add all properties to each state',
                title: 'Loading...',
              },
              success: {
                action: {
                  altText: 'Undo',
                  label: 'Undo',
                  onClick: () => console.log('Undo'),
                },
                description: '',
                title: 'This was a Success',
              },
            })
          }
        >
          Show toast
        </Button>
      </div>
    );
  },
};
