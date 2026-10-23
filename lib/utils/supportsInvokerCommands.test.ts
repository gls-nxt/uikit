import { afterEach, describe, expect, it, vi } from 'vitest';

describe('supportsInvokerCommands', () => {
  afterEach(() => {
    delete (HTMLButtonElement.prototype as { command?: unknown }).command;
  });

  it('returns false when the browser lacks the command property', async () => {
    vi.resetModules();
    const { supportsInvokerCommands } = await import('./supportsInvokerCommands');

    expect(supportsInvokerCommands()).toBe(false);
  });

  it('returns true when the browser exposes command on HTMLButtonElement', async () => {
    vi.resetModules();
    Object.defineProperty(HTMLButtonElement.prototype, 'command', {
      configurable: true,
      value: '',
    });

    const { supportsInvokerCommands } = await import('./supportsInvokerCommands');

    expect(supportsInvokerCommands()).toBe(true);
  });

  it('caches the result after the first call', async () => {
    vi.resetModules();
    const { supportsInvokerCommands } = await import('./supportsInvokerCommands');

    expect(supportsInvokerCommands()).toBe(false);

    Object.defineProperty(HTMLButtonElement.prototype, 'command', {
      configurable: true,
      value: '',
    });

    expect(supportsInvokerCommands()).toBe(false); // still cached from the first call
  });
});
