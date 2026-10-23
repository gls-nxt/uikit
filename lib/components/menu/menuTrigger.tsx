import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import type React from 'react';

export type MenuTriggerProps = React.ComponentPropsWithoutRef<typeof RadixMenu.Trigger>;

/**
 * What opens the menu. Defaults to `asChild`, so the child is the trigger and
 * no extra button is rendered around it — pass `asChild={false}` for a plain
 * trigger button of your own.
 */
export const MenuTrigger = ({ asChild = true, ...props }: MenuTriggerProps) => (
  <RadixMenu.Trigger {...props} asChild={asChild} />
);

MenuTrigger.displayName = 'MenuTrigger';
