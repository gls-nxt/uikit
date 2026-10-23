import { renderHook } from '@testing-library/react';
import { describe, it } from 'vitest';

import { useToasterState } from './use-toaster-state';

describe('useToasterState', () => {
  it('returns state', () => {
    const { result } = renderHook(useToasterState);

    expect(result.current.toasts).toEqual([]);
    expect(result.current.maxVisibleToasts).toBe(10);
  });

  it('accepts initial state', () => {
    const toasts = [{ id: 'id', title: 'title' }];

    const { result } = renderHook(() => useToasterState({ maxVisibleToasts: 1, toasts }));

    expect(result.current.toasts).toBe(toasts);
    expect(result.current.maxVisibleToasts).toBe(1);
  });

  it('returns dismiss functions', () => {
    const { result } = renderHook(useToasterState);

    expect(result.current.dismiss).toBeDefined();
    expect(result.current.dismissAll).toBeDefined();
  });
});
