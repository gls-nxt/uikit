import Typography from '@components/typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { action } from 'storybook/actions';

import Button from '../button';
import { Combobox } from '../combobox';
import { ComboboxItem } from '../comboboxItem';
import { Menu } from '../menu';
import { Popover } from '../popover';
import { Tooltip } from '../tooltip';

import Dialog, { type DialogContentProps, type DialogRootProps } from './dialog';

const DIALOG_ID = 'dialog-story';
const TITLE_ID = `${DIALOG_ID}-title`;
const DESCRIPTION_ID = `${DIALOG_ID}-description`;

type DialogStoryArgs = {
  children: ReactNode;
  closedby?: DialogContentProps['closedby'];
  description?: string;
  id: DialogRootProps['id'];
  onOpenChange?: DialogRootProps['onOpenChange'];
  size?: DialogContentProps['size'];
  title: ReactNode;
  'data-testid'?: string;
};

const renderDialog = ({
  children,
  'data-testid': dataTestId,
  description,
  id,
  onOpenChange,
  title,
  ...contentProps
}: DialogStoryArgs) => (
  <Dialog.Root id={id} onOpenChange={onOpenChange}>
    <Dialog.Trigger asChild>
      <Button>Open Dialog</Button>
    </Dialog.Trigger>
    <Dialog.Content
      aria-describedby={description ? DESCRIPTION_ID : undefined}
      aria-labelledby={TITLE_ID}
      data-testid={dataTestId}
      {...contentProps}
    >
      <Dialog.Close />
      <Dialog.Header>
        <Dialog.Title id={TITLE_ID}>{title}</Dialog.Title>
        {description ? (
          <Dialog.Description id={DESCRIPTION_ID} visuallyHidden>
            {description}
          </Dialog.Description>
        ) : null}
      </Dialog.Header>
      <Dialog.Body>{children}</Dialog.Body>
    </Dialog.Content>
  </Dialog.Root>
);

const meta = {
  args: {
    children: 'Dialog Content',
    description: 'Hidden description',
    id: DIALOG_ID,
    onOpenChange: action('onOpenChange'),
    size: 'md',
    title: 'Dialog title as string',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content rendered inside `Dialog.Body`.',
      required: true,
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    closedby: {
      control: 'select',
      description: 'Native `closedby` attribute controlling how the dialog can be dismissed.',
      options: [undefined, 'any', 'closerequest', 'none'],
      table: {
        type: { summary: '"any" | "closerequest" | "none"' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute for the native dialog element.',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Text rendered through `Dialog.Description` and linked with aria-describedby.',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      control: 'text',
      description: 'Native dialog id used by trigger and close controls via `commandfor`.',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      description: 'Size of the dialog content.',
      options: ['sm', 'md', 'lg', 'xl'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: 'Content rendered through `Dialog.Title`.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['toggle', 'close', 'cancel'],
    },
    docs: {
      description: {
        component: 'A native HTML dialog composed with Radix-style slots.',
      },
    },
    layout: 'padded',
  },
  render: renderDialog,
  title: 'Components/Dialog',
} satisfies Meta<DialogStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomCloseButton: Story = {
  args: {
    title: 'Custom Close Button Example',
  },
  render: (args) => {
    const dialogId = args.id ?? DIALOG_ID;
    const titleId = `${dialogId}-title`;

    return (
      <Dialog.Root id={dialogId} onOpenChange={args.onOpenChange}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog with Custom Close</Button>
        </Dialog.Trigger>
        <Dialog.Content aria-labelledby={titleId} closedby={args.closedby} size={args.size}>
          <Dialog.Header>
            <Dialog.Title id={titleId}>{args.title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <p>
              This dialog demonstrates how to use a custom close button within the dialog content.
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button>Close Dialog</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    );
  },
};

export const CustomTitleStyling: Story = {
  args: {
    title: <Typography size={4}>Custom title style</Typography>,
  },
};

export const HiddenTitle: Story = {
  args: {
    children: 'Hidden dialog title is still accessible to screen readers',
    title: 'Hidden title',
  },
  render: (args) => {
    const dialogId = args.id ?? DIALOG_ID;
    const titleId = `${dialogId}-title`;

    return (
      <Dialog.Root id={dialogId} onOpenChange={args.onOpenChange}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content aria-labelledby={titleId} closedby={args.closedby} size={args.size}>
          <Dialog.Close />
          <Dialog.Header>
            <Dialog.Title id={titleId} visuallyHidden>
              {args.title}
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>{args.children}</Dialog.Body>
        </Dialog.Content>
      </Dialog.Root>
    );
  },
};

export const WithFloatingContent: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string>();

    const options = useMemo(
      () => [
        { id: 'de', value: 'Germany' },
        { id: 'fi', value: 'Finland' },
        { id: 'pt', value: 'Portugal' },
        { id: 'be', value: 'Belgium' },
      ],
      [],
    );

    return (
      <Dialog.Root id="dialog-floating-content" onOpenChange={action('onOpenChange')}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content aria-labelledby="dialog-floating-content-title" size="md">
          <Dialog.Close />
          <Dialog.Header>
            <Dialog.Title id="dialog-floating-content-title">Floating content</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body
            style={{
              display: 'grid',
              gap: '1rem',
            }}
          >
            <Typography color="label" size={4}>
              These controls should render above the native dialog content.
            </Typography>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Tooltip trigger={<Button size="sm">Tooltip</Button>}>
                Tooltip content inside Dialog
              </Tooltip>

              <Popover trigger={<Button size="sm">Popover</Button>}>
                Popover content inside Dialog
              </Popover>

              <Menu
                items={['First action', 'Second action', 'Third action']}
                trigger={<Button size="sm">Menu</Button>}
              />
            </div>

            <Combobox
              inputProps={{ fullWidth: true, label: 'Country' }}
              onSelect={(option) => setSelected(option?.id)}
              options={options}
              selected={selected}
            >
              {(option) => <ComboboxItem key={option.id}>{option.value}</ComboboxItem>}
            </Combobox>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Root>
    );
  },
};
