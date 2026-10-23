import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';

import { menuHeadingVariants } from './menuHeading.variants';

export type MenuHeadingProps = Prettify<
  React.ComponentPropsWithoutRef<typeof RadixMenu.Label> & {
    label: string;
    size?: 'sm' | 'lg';
    className?: string;
    'data-testid'?: string;
  }
>;

export const MenuHeading = ({
  label,
  size,
  className,
  'data-testid': dataTestId,
  ...props
}: MenuHeadingProps) => {
  const combinedClassName = cx(menuHeadingVariants({ size }), className);

  return (
    <RadixMenu.Label {...props} className={combinedClassName} data-testid={dataTestId}>
      {label}
    </RadixMenu.Label>
  );
};

MenuHeading.displayName = 'MenuHeading';

export default MenuHeading;
