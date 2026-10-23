import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import type React from 'react';

import { useOptionalDialogContext } from '../dialog/dialogContext';

export type MenuPortalProps = React.ComponentPropsWithoutRef<typeof RadixMenu.Portal>;

/**
 * Where the content renders. Defaults to `document.body`, which a trigger
 * inside a top-layer element — a `<dialog>`, a popover — paints behind whatever
 * the z-index. Point `container` at that element to render into it instead.
 *
 * A `Dialog.Content` ancestor supplies the container on its own, so an explicit
 * `container` is only needed for every other kind of top-layer host.
 */
export const MenuPortal = ({ container, ...props }: MenuPortalProps) => {
  const dialogContext = useOptionalDialogContext();

  return (
    <RadixMenu.Portal
      {...props}
      container={container ?? dialogContext?.portalContainer ?? undefined}
    />
  );
};

MenuPortal.displayName = 'MenuPortal';
