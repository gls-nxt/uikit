import { fireEvent, render, screen } from '@testing-library/react';
import { supportsInvokerCommands } from '@utils/supportsInvokerCommands';
import { axe } from 'jest-axe';
import { createRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Button from '../button';

import Dialog, { DialogClose, type DialogContentProps, type DialogRootProps } from './dialog';
import { closeDialog, showDialogModal } from './dialogInvokerFallback';

vi.mock('@utils/supportsInvokerCommands', () => ({
  supportsInvokerCommands: vi.fn(),
}));
vi.mock('./dialogInvokerFallback', () => ({
  closeDialog: vi.fn(),
  showDialogModal: vi.fn(),
}));

const dialogId = 'test-dialog';
const titleId = `${dialogId}-title`;

const renderDialog = (
  contentProps: Partial<DialogContentProps> = {},
  rootProps: Partial<DialogRootProps> = {},
) => {
  return render(
    <Dialog.Root id={dialogId} {...rootProps}>
      <Dialog.Content aria-labelledby={titleId} {...contentProps}>
        <Dialog.Close data-testid="dialogClose" />
        <Dialog.Header>
          <Dialog.Title id={titleId}>Dialog title</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>Dialog Content</Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>,
  );
};

describe('Dialog Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default to a browser with native support; fallback-specific tests
    // override this to false.
    vi.mocked(supportsInvokerCommands).mockReturnValue(true);
  });

  it('renders the native dialog with correct content', () => {
    const { container } = renderDialog();
    const dialog = container.querySelector('dialog');

    expect(dialog).toHaveAttribute('id', dialogId);
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('can be opened by a native command trigger', () => {
    render(
      <Dialog.Root id={dialogId}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content aria-labelledby={titleId}>
          <Dialog.Title id={titleId}>Dialog title</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>,
    );

    const trigger = screen.getByText('Open Dialog');
    expect(trigger).toHaveAttribute('command', 'show-modal');
    expect(trigger).toHaveAttribute('commandfor', dialogId);
  });

  it('wires the default close button to the native dialog id', () => {
    renderDialog();

    const close = screen.getByTestId('dialogClose');
    expect(close).toHaveAttribute('command', 'close');
    expect(close).toHaveAttribute('commandfor', dialogId);
    expect(close).toHaveAttribute('aria-label', 'close');
  });

  it('forwards refs to the native dialog element', () => {
    const ref = createRef<HTMLDialogElement>();
    render(
      <Dialog.Root id={dialogId}>
        <Dialog.Content aria-labelledby={titleId} ref={ref}>
          <Dialog.Title id={titleId}>Dialog title</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>,
    );

    expect(ref.current?.tagName).toBe('DIALOG');
  });

  it('forwards refs to custom DialogClose buttons', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <DialogClose dialogId={dialogId} ref={ref}>
        Close Dialog
      </DialogClose>,
    );

    expect(ref.current).toHaveTextContent('Close Dialog');
  });

  it('passes closedby through to the native dialog element', () => {
    const { container } = renderDialog({ closedby: 'closerequest' });

    expect(container.querySelector('dialog')).toHaveAttribute('closedby', 'closerequest');
  });

  it('calls onOpenChange when the native dialog toggles', () => {
    const handleOpenChange = vi.fn();
    const { container } = renderDialog({}, { onOpenChange: handleOpenChange });
    const dialog = container.querySelector('dialog') as HTMLDialogElement;

    dialog.setAttribute('open', '');
    fireEvent(dialog, new Event('toggle', { bubbles: true }));
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });

  it('supports custom close buttons with native command props', () => {
    render(
      <Dialog.Root id={dialogId}>
        <Dialog.Content aria-labelledby={titleId}>
          <Dialog.Title id={titleId}>Dialog title</Dialog.Title>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button>Close Dialog</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>,
    );

    const close = screen.getByText('Close Dialog');
    expect(close).toHaveAttribute('command', 'close');
    expect(close).toHaveAttribute('commandfor', dialogId);
  });

  it('links a consumer-provided aria-labelledby to the native dialog', () => {
    const { container } = renderDialog();
    const dialog = container.querySelector('dialog');

    expect(dialog).toHaveAttribute('aria-labelledby', titleId);
  });

  it('links a consumer-provided aria-describedby to the native dialog', () => {
    const descriptionId = `${dialogId}-description`;
    const { container } = render(
      <Dialog.Root id={dialogId}>
        <Dialog.Content aria-describedby={descriptionId} aria-labelledby={titleId}>
          <Dialog.Title id={titleId}>Dialog title</Dialog.Title>
          <Dialog.Description id={descriptionId}>A description</Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>,
    );

    expect(container.querySelector('dialog')).toHaveAttribute('aria-describedby', descriptionId);
  });

  it('is accessible with no violations', async () => {
    const { container } = renderDialog();
    container.querySelector('dialog')?.setAttribute('open', '');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('falls back to showDialogModal when native commands are unsupported', () => {
    vi.mocked(supportsInvokerCommands).mockReturnValue(false);
    render(
      <Dialog.Root id={dialogId}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content aria-labelledby={titleId}>
          <Dialog.Title id={titleId}>Dialog title</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>,
    );

    fireEvent.click(screen.getByText('Open Dialog'));

    expect(showDialogModal).toHaveBeenCalledWith(dialogId);
  });

  it('does not call the fallback when native commands are supported', () => {
    render(
      <Dialog.Root id={dialogId}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content aria-labelledby={titleId}>
          <Dialog.Title id={titleId}>Dialog title</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>,
    );

    fireEvent.click(screen.getByText('Open Dialog'));

    expect(showDialogModal).not.toHaveBeenCalled();
  });

  it('falls back to closeDialog when native commands are unsupported', () => {
    vi.mocked(supportsInvokerCommands).mockReturnValue(false);
    renderDialog();

    fireEvent.click(screen.getByTestId('dialogClose'));

    expect(closeDialog).toHaveBeenCalledWith(dialogId, 'close');
  });
});
