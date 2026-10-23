import { type ReactNode, useCallback, useState } from 'react';

import Alerter from '../alerter';

import { AlertContext } from './alert-context';
import { useAlerterState } from './use-alerter-state';

type AlertProviderProps = {
  children: ReactNode;
  maxVisibleAlerts?: number;
  defaultDuration?: number;
  contained?: boolean;
  className?: string;
};

export function AlertProvider({
  children,
  maxVisibleAlerts,
  defaultDuration,
  contained,
  className,
}: AlertProviderProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const { alerts, showAlert, hideAlert } = useAlerterState({ defaultDuration, maxVisibleAlerts });

  const containerCallback = useCallback((element: HTMLDivElement | null) => {
    setContainer(element);
  }, []);

  return (
    <AlertContext.Provider value={{ hideAlert, showAlert }}>
      {contained ? (
        <>
          <div className={className} ref={containerCallback}>
            {!!container && <Alerter alerts={alerts} container={container} />}
          </div>
          {children}
        </>
      ) : (
        <>
          {children}
          <Alerter alerts={alerts} className={className} />
        </>
      )}
    </AlertContext.Provider>
  );
}
