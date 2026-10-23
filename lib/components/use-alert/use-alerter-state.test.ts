import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useAlerterState } from './use-alerter-state';

describe('useAlerterState', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns state', () => {
    const { result } = renderHook(useAlerterState);

    expect(result.current.alerts).toEqual([]);
    expect(result.current.showAlert).toBeDefined();
    expect(result.current.hideAlert).toBeDefined();
  });

  it('shows alert', async () => {
    const { result } = renderHook(useAlerterState);

    act(() => {
      result.current.showAlert({
        message: 'Test message',
        title: 'Test Alert',
        variant: 'info',
      });
    });

    expect(result.current.alerts[0]).toMatchObject({
      message: 'Test message',
      title: 'Test Alert',
      variant: 'info',
    });
  });

  it('hides alert', async () => {
    const { result } = renderHook(useAlerterState);

    act(() => {
      result.current.showAlert({
        id: 'test-id',
        title: 'Test Alert',
        variant: 'info',
      });
    });

    expect(result.current.alerts).toHaveLength(1);

    act(() => {
      result.current.hideAlert('test-id');
    });

    expect(result.current.alerts).toHaveLength(0);
  });

  it('respects maxVisibleAlerts', async () => {
    const { result } = renderHook(() => useAlerterState({ maxVisibleAlerts: 2 }));

    act(() => {
      result.current.showAlert({ id: '1', title: 'First', variant: 'info' });
      result.current.showAlert({ id: '2', title: 'Second', variant: 'info' });
      result.current.showAlert({ id: '3', title: 'Third', variant: 'info' });
    });

    expect(result.current.alerts).toHaveLength(2);
    expect(result.current.alerts[0].title).toBe('Second');
    expect(result.current.alerts[1].title).toBe('Third');
  });

  it('auto-dismisses alerts with duration', async () => {
    const { result } = renderHook(() => useAlerterState({ defaultDuration: 1000 }));

    act(() => {
      result.current.showAlert({
        id: 'test-id',
        title: 'Test Alert',
        variant: 'info',
      });
    });

    expect(result.current.alerts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.alerts).toHaveLength(0);
  });

  it('respects custom duration over default', async () => {
    const { result } = renderHook(() => useAlerterState({ defaultDuration: 5000 }));

    act(() => {
      result.current.showAlert({
        duration: 1000,
        id: 'test-id',
        title: 'Test Alert',
        variant: 'info',
      });
    });

    expect(result.current.alerts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.alerts).toHaveLength(0);
  });
});
