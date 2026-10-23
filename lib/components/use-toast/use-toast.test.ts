import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { useToast } from './use-toast';
import { useToasterState } from './use-toaster-state';

describe('useToast', () => {
  it('returns toast function', () => {
    const { result } = renderHook(useToast);

    expect(result.current.toast).toBeDefined();
  });

  it('returns dismiss function', () => {
    const { result } = renderHook(useToast);

    expect(result.current.dismiss).toBeDefined();
  });
});

describe('toast', () => {
  beforeEach(async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const { result } = renderHook(useToasterState);

    await waitFor(() => result.current.dismissAll());
    act(() => vi.advanceTimersByTime(2000));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns id, update and dismiss functions', async () => {
    const { result } = renderHook(useToast);

    const { id, update, dismiss } = await waitFor(() => result.current.toast({ title: 'title' }));

    expect(id).toBeDefined();
    expect(update).toBeDefined();
    expect(dismiss).toBeDefined();
  });

  it('returns correct id', async () => {
    const { result } = renderHook(useToast);
    const { result: toasterResult } = renderHook(useToasterState);

    const { id } = await waitFor(() => result.current.toast({ title: 'test-title' }));

    expect(toasterResult.current.toasts.find((item) => id === item.id)?.title).toBe('test-title');
  });

  it('returns dismiss function that deletes the toast with the returned id', async () => {
    const { result } = renderHook(useToast);
    const { result: toasterResult } = renderHook(useToasterState);

    const { id: id1, dismiss } = await waitFor(() => result.current.toast({ title: 'first' }));
    const { id: id2 } = await waitFor(() => result.current.toast({ title: 'second' }));

    await waitFor(() => dismiss());

    expect(toasterResult.current.toasts.find((item) => id1 === item.id)?.open).toBe(false);
    expect(toasterResult.current.toasts.find((item) => id2 === item.id)?.open).toBe(true);

    act(() => vi.advanceTimersByTime(2000));

    expect(toasterResult.current.toasts.find((item) => id1 === item.id)).not.toBeDefined();
    expect(toasterResult.current.toasts.find((item) => id2 === item.id)).toBeDefined();
  });

  it('returns update function that updates the toast with the returned id', async () => {
    const { result } = renderHook(useToast);
    const { result: toasterResult } = renderHook(useToasterState);

    const { id, update } = await waitFor(() => result.current.toast({ title: 'initial-title' }));

    await waitFor(() => update({ id, title: 'updated-title' }));

    expect(toasterResult.current.toasts.find((item) => id === item.id)?.title).toBe(
      'updated-title',
    );
  });

  it('handles promise toast correctly', async () => {
    const { result } = renderHook(useToast);
    const { result: toasterResult } = renderHook(useToasterState);

    const promise = new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const { id } = await waitFor(() =>
      result.current.toast.promise(promise, {
        error: { title: 'error' },
        pending: { title: 'pending' },
        success: { title: 'success' },
      }),
    );

    expect(toasterResult.current.toasts.find((item) => id === item.id)?.title).toBe('pending');

    await act(() => vi.advanceTimersByTimeAsync(2000));

    expect(toasterResult.current.toasts.find((item) => id === item.id)?.title).toBe('success');
  });

  it('updates prefix with custom prefix on promise', async () => {
    const { result } = renderHook(useToast);
    const { result: toasterResult } = renderHook(useToasterState);

    const promise = new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const { id } = await waitFor(() =>
      result.current.toast.promise(promise, {
        error: { title: 'error' },
        pending: { title: 'pending' },
        success: { prefix: 'customPrefix', title: 'success' },
      }),
    );

    expect(toasterResult.current.toasts.find((item) => id === item.id)?.title).toBe('pending');

    await act(() => vi.advanceTimersByTimeAsync(2000));

    expect(toasterResult.current.toasts.find((item) => id === item.id)?.prefix).toBe(
      'customPrefix',
    );
  });
});
