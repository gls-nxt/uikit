import type { MenuItemOption } from '@components/menu';
import { MenuHeading, type MenuHeadingProps } from '@components/menuHeading';
import { MenuItem, type MenuItemProps } from '@components/menuItem';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';

import { menuGroupVariants } from './menuGroup.variants';

export type MenuGroupProps = Prettify<
  React.ComponentPropsWithoutRef<typeof RadixMenu.Group> & {
    label?: string;
    items?: MenuItemOption[];
    size?: 'sm' | 'lg';
    className?: string;
    headingProps?: MenuHeadingProps;
    itemProps?: MenuItemProps;
    'data-testid'?: string;
    onSelect?: (event: Event, item: MenuItemOption) => void;
  }
>;

export const MenuGroup = ({
  children,
  label,
  items,
  size,
  className,
  headingProps,
  itemProps,
  'data-testid': dataTestId,
  onSelect,
  ...props
}: MenuGroupProps) => {
  const combinedClassName = cx(menuGroupVariants({}), className);

  const handleSelect = (item: MenuItemOption) => (event: Event) => onSelect?.(event, item);

  return (
    <RadixMenu.Group {...props} className={combinedClassName} data-testid={dataTestId}>
      {items ? (
        <>
          {label ? <MenuHeading {...headingProps} label={label} size={size} /> : null}
          {items.map((item) => {
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
          })}
        </>
      ) : (
        children
      )}
    </RadixMenu.Group>
  );
};

MenuGroup.displayName = 'MenuGroup';

export default MenuGroup;
