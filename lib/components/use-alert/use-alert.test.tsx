import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AlertProvider } from './alert-provider';
import { useAlert } from './use-alert';

describe('useAlert', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AlertProvider>{children}</AlertProvider>
  );

  it('returns showAlert function', () => {
    const { result } = renderHook(() => useAlert(), { wrapper });

    expect(result.current.showAlert).toBeDefined();
  });

  it('returns hideAlert function', () => {
    const { result } = renderHook(() => useAlert(), { wrapper });

    expect(result.current.hideAlert).toBeDefined();
  });

  it('throws error when used outside AlertProvider', () => {
    expect(() => {
      renderHook(() => useAlert());
    }).toThrow('useAlert must be used within an AlertProvider');
  });
});
