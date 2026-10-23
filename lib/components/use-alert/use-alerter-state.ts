import { useCallback, useRef, useState } from 'react';

import type { AlertItem, AlertOptions } from './alert-context';

type UseAlerterStateOptions = {
  maxVisibleAlerts?: number;
  defaultDuration?: number;
};

export function useAlerterState({
  maxVisibleAlerts = 3,
  defaultDuration,
}: UseAlerterStateOptions = {}) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const idCounter = useRef(0);

  const hideAlert = useCallback((id: string) => {
    setAlerts((current) => current.filter((alert) => alert.id !== id));
  }, []);

  const showAlert = useCallback(
    (options: AlertOptions) => {
      const id = options.id ?? String(++idCounter.current);
      const duration = options.duration ?? defaultDuration;
      const newAlert = { ...options, id };
      setAlerts((current) => [...current, newAlert].slice(-maxVisibleAlerts));

      if (duration !== undefined && duration > 0) {
        setTimeout(() => hideAlert(id), duration);
      }
    },
    [maxVisibleAlerts, defaultDuration, hideAlert],
  );

  return {
    alerts,
    hideAlert,
    showAlert,
  };
}
