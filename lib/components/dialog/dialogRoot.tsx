import type { Prettify } from '@utils/types';
import { type ReactNode, useMemo, useState } from 'react';

import { DialogContext } from './dialogContext';

export type DialogRootProps = Prettify<{
  children: ReactNode;
  id: string;
  onOpenChange?: (open: boolean) => void;
}>;

export const DialogRoot = ({ children, id, onOpenChange }: DialogRootProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLDialogElement | null>(null);

  const contextValue = useMemo(
    () => ({ id, onOpenChange, portalContainer, setPortalContainer }),
    [id, onOpenChange, portalContainer],
  );

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>;
};

DialogRoot.displayName = 'DialogRoot';
