import { createContext, useContext } from 'react';

export type DialogContextValue = {
  id: string;
  onOpenChange: ((open: boolean) => void) | undefined;
  portalContainer: HTMLDialogElement | null;
  setPortalContainer: (container: HTMLDialogElement | null) => void;
};

export const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export const useDialogContext = (componentName: string) => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Dialog.Root`);
  }

  return context;
};

export const useOptionalDialogContext = () => useContext(DialogContext);
