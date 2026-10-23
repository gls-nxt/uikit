/**
 * Fallback dispatch for the dialog commands this library actually uses
 * (`show-modal`, `close`, `request-close`), for browsers without native
 * `command`/`commandfor` support. Colocated with Dialog on purpose: these
 * calls only make sense against a `<dialog>` element. If a future
 * component needs `show-popover`/`hide-popover`/`toggle-popover`, that
 * dispatch logic belongs next to that component, not here — the only
 * thing worth sharing across commands is the feature check itself
 * (`@utils/supportsInvokerCommands`), not the per-command DOM calls.
 */

export function showDialogModal(dialogId: string) {
  const dialog = document.getElementById(dialogId);
  if (dialog instanceof HTMLDialogElement && !dialog.open) {
    dialog.showModal();
  }
}

export function closeDialog(dialogId: string, command: 'close' | 'request-close', value?: string) {
  const dialog = document.getElementById(dialogId);
  if (!(dialog instanceof HTMLDialogElement) || !dialog.open) {
    return;
  }

  if (command === 'request-close') {
    if (typeof dialog.requestClose === 'function') {
      dialog.requestClose(value);
      return;
    }
    // requestClose() itself is only native from Safari 18.4; ponyfill the
    // cancel-event dance for browsers that have neither it nor `command`.
    const cancelEvent = new Event('cancel', { cancelable: true });
    dialog.dispatchEvent(cancelEvent);
    if (!cancelEvent.defaultPrevented) {
      dialog.close(value);
    }
    return;
  }

  dialog.close(value);
}
