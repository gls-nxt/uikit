/**
 * Feature-detects the HTML Invoker Commands API (`command`/`commandfor`).
 * Firefox added support in version 144 (Oct 2025); Firefox ESR 140 and
 * ESR 115 predate it. The result never changes at runtime, so it's cached
 * after the first call.
 */
let supported: boolean | null = null;

export function supportsInvokerCommands(): boolean {
  if (supported === null) {
    supported =
      typeof HTMLButtonElement !== 'undefined' && 'command' in HTMLButtonElement.prototype;
  }
  return supported;
}
