import type React from 'react';
import { useCallback } from 'react';

import { supportsInvokerCommands } from './supportsInvokerCommands';

/**
 * Generic onClick wrapper for a button rendering `command`/`commandfor`.
 * Deliberately knows nothing about which command or target element is
 * involved — each command needs its own DOM calls (`showModal()` vs
 * `close()` vs `showPopover()`, etc.), so callers supply that as `fallback`.
 * On browsers with native support, this only runs the (cached) feature
 * check and the caller's own onClick; `fallback` never executes and the
 * native command dispatch handles everything, unchanged.
 *
 * Command dispatch is the click's default action (same as a submit button
 * or a link), so native support skips it when an earlier handler calls
 * `event.preventDefault()`. We mirror that here so a consumer guarding the
 * action (e.g. "don't close if the form is dirty") behaves the same on
 * both supporting and non-supporting browsers.
 */
export function useInvokerFallbackClick(
  fallback: () => void,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
): React.MouseEventHandler<HTMLButtonElement> {
  return useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }
      if (!supportsInvokerCommands()) {
        fallback();
      }
    },
    [fallback, onClick],
  );
}
