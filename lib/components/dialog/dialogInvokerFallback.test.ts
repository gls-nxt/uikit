import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { closeDialog, showDialogModal } from './dialogInvokerFallback';

describe('dialogInvokerFallback', () => {
  let dialog: HTMLDialogElement;

  beforeEach(() => {
    dialog = document.createElement('dialog');
    dialog.id = 'test-dialog';
    document.body.appendChild(dialog);

    // jsdom doesn't implement these natively; stub them so we can assert on calls.
    dialog.showModal = vi.fn(() => dialog.setAttribute('open', ''));
    dialog.close = vi.fn(() => dialog.removeAttribute('open'));
  });

  afterEach(() => {
    document.body.removeChild(dialog);
  });

  it('showDialogModal calls showModal only when the dialog is closed', () => {
    showDialogModal('test-dialog');
    expect(dialog.showModal).toHaveBeenCalledTimes(1);

    showDialogModal('test-dialog'); // already open now
    expect(dialog.showModal).toHaveBeenCalledTimes(1);
  });

  it('showDialogModal is a no-op for an unknown id', () => {
    expect(() => showDialogModal('missing')).not.toThrow();
  });

  it('closeDialog("close") calls close only when the dialog is open', () => {
    dialog.setAttribute('open', '');

    closeDialog('test-dialog', 'close');
    expect(dialog.close).toHaveBeenCalledTimes(1);

    closeDialog('test-dialog', 'close'); // already closed now
    expect(dialog.close).toHaveBeenCalledTimes(1);
  });

  it('closeDialog("request-close") uses native requestClose when available', () => {
    dialog.setAttribute('open', '');
    dialog.requestClose = vi.fn();

    closeDialog('test-dialog', 'request-close');

    expect(dialog.requestClose).toHaveBeenCalledTimes(1);
    expect(dialog.close).not.toHaveBeenCalled();
  });

  it('closeDialog("request-close") ponyfills via a cancelable cancel event when requestClose is absent', () => {
    dialog.setAttribute('open', '');

    closeDialog('test-dialog', 'request-close');

    expect(dialog.close).toHaveBeenCalledTimes(1);
  });

  it('closeDialog("request-close") respects preventDefault on the cancel event', () => {
    dialog.setAttribute('open', '');
    dialog.addEventListener('cancel', (event) => event.preventDefault());

    closeDialog('test-dialog', 'request-close');

    expect(dialog.close).not.toHaveBeenCalled();
  });
});
