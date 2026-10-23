import { useCallback, useContext } from 'react';

import { AlertContext, type AlertOptions } from './alert-context';

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }

  const { showAlert, hideAlert } = context;

  return {
    hideAlert: useCallback(
      (id: string) => {
        hideAlert(id);
      },
      [hideAlert],
    ),
    showAlert: useCallback(
      (options: AlertOptions) => {
        showAlert(options);
      },
      [showAlert],
    ),
  };
}
