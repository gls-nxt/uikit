import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import type React from 'react';

export type MenuRootProps = React.ComponentPropsWithoutRef<typeof RadixMenu.Root>;

/** Owns the open state every other segment reads. */
export const MenuRoot = (props: MenuRootProps) => <RadixMenu.Root {...props} />;

MenuRoot.displayName = 'MenuRoot';
