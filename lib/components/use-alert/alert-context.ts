import { createContext } from 'react';

import type { AlertProps } from '../alert/alert';

export type AlertOptions = Pick<AlertProps, 'title' | 'message' | 'variant'> & {
  id?: string;
  duration?: number;
};

export type AlertItem = AlertOptions & { id: string };

export type AlertContextValue = {
  showAlert: (options: AlertOptions) => void;
  hideAlert: (id: string) => void;
};

export const AlertContext = createContext<AlertContextValue | undefined>(undefined);
AlertContext.displayName = 'AlertContext';
