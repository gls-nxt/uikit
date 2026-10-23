export { MenuContent, type MenuContentProps } from './menuContent';
export { MenuPortal, type MenuPortalProps } from './menuPortal';
export { MenuRoot, type MenuRootProps } from './menuRoot';
export { MenuTrigger, type MenuTriggerProps } from './menuTrigger';

import { MenuGroup } from '@components/menuGroup';
import { MenuHeading } from '@components/menuHeading';
import { MenuItem } from '@components/menuItem';

import type * as RadixMenu from '@radix-ui/react-dropdown-menu';
import type { Prettify } from '@utils/types';
import type React from 'react';

import { MenuContent } from './menuContent';
import { MenuPortal } from './menuPortal';
import { MenuRoot } from './menuRoot';
import { MenuTrigger } from './menuTrigger';

export type MenuItemOption =
  | string
  | number
  | { label: string; disabled?: boolean; [key: string]: unknown };

export type MenuProps = Prettify<
  React.ComponentPropsWithoutRef<typeof RadixMenu.Root> & {
    /**
     * @deprecated Use `Menu.Trigger` inside `Menu.Root` instead.
     */
    trigger?: React.ReactNode;
    /**
     * @deprecated Use `Menu.Item` inside `Menu.Content` instead.
     */
    items?: MenuItemOption[];
    align?: React.ComponentPropsWithoutRef<typeof RadixMenu.Content>['align'];
    size?: 'sm' | 'lg';
    className?: string;
    /**
     * Where the menu renders. Defaults to `document.body`, which a trigger
     * inside a top-layer element — a `<dialog>`, a popover — paints behind
     * whatever the z-index. Point `container` at that element to render into it
     * instead. `Dialog.Content` supplies it on its own; this is the escape
     * hatch for every other one.
     *
     * @deprecated Use `Menu.Portal` inside `Menu.Root` instead.
     */
    portalProps?: React.ComponentPropsWithoutRef<typeof RadixMenu.Portal>;
    /**
     * @deprecated Put the props on `Menu.Content` instead.
     */
    contentProps?: React.ComponentPropsWithoutRef<typeof RadixMenu.Content>;
    /**
     * @deprecated Put the props on `Menu.Item` instead.
     */
    itemProps?: React.ComponentPropsWithoutRef<typeof RadixMenu.Item>;
    'data-testid'?: string;
    /**
     * @deprecated Use `onSelect` on each `Menu.Item` instead.
     */
    onSelect?: (event: Event, item: MenuItemOption) => void;
  }
>;

const MenuLegacy = ({
  children,
  trigger,
  items,
  align,
  size,
  className,
  portalProps,
  contentProps,
  itemProps,
  'data-testid': dataTestId,
  onSelect,
  ...props
}: MenuProps) => {
  const handleSelect = (item: MenuItemOption) => (event: Event) => onSelect?.(event, item);

  const content = items
    ? items.map((item) => {
        const isObject = typeof item === 'object' && item !== null;

        return (
          <MenuItem
            key={isObject ? item.label : item}
            {...itemProps}
            disabled={isObject && item.disabled}
            label={`${isObject ? item.label : item}`}
            onSelect={handleSelect(item)}
            size={size}
          />
        );
      })
    : children;

  return (
    <MenuRoot {...props}>
      <MenuTrigger>{trigger}</MenuTrigger>
      <MenuPortal {...portalProps}>
        <MenuContent {...contentProps} align={align} className={className} data-testid={dataTestId}>
          {content}
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
};

MenuLegacy.displayName = 'Menu';

export const Menu = Object.assign(MenuLegacy, {
  Content: MenuContent,
  Group: MenuGroup,
  Heading: MenuHeading,
  Item: MenuItem,
  Portal: MenuPortal,
  Root: MenuRoot,
  Trigger: MenuTrigger,
});

export default Menu;
