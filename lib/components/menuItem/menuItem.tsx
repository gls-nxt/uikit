import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';

import { menuItemAdornmentVariants, menuItemVariants } from './menuItem.variants';

export type MenuItemProps = Prettify<
  Omit<React.ComponentPropsWithoutRef<typeof RadixMenu.Item>, 'prefix' | 'suffix'> & {
    label: string;
    size?: 'sm' | 'lg';
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    className?: string;
    adornmentClassName?: string;
    'data-testid'?: string;
  }
>;

export const MenuItem = ({
  label,
  size,
  prefix,
  suffix,
  className,
  adornmentClassName,
  'data-testid': dataTestId,
  ...props
}: MenuItemProps) => {
  const combinedClassName = cx(menuItemVariants({ size }), className);
  const leftAdornemntClassName = cx(
    menuItemAdornmentVariants({ side: 'left' }),
    adornmentClassName,
  );
  const rightAdornemntClassName = cx(
    menuItemAdornmentVariants({ side: 'right' }),
    adornmentClassName,
  );

  return (
    <RadixMenu.Item {...props} className={combinedClassName} data-testid={dataTestId}>
      {prefix ? <span className={leftAdornemntClassName}>{prefix}</span> : null}
      {label}
      {suffix ? <span className={rightAdornemntClassName}>{suffix}</span> : null}
    </RadixMenu.Item>
  );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
