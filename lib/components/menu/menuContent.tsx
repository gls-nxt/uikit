import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';

import { menuVariants } from './menu.variants';

export type MenuContentProps = Prettify<
  React.ComponentPropsWithoutRef<typeof RadixMenu.Content> & {
    'data-testid'?: string;
  }
>;

/** The surface the items sit on. */
export const MenuContent = ({
  className,
  sideOffset = 5,
  'data-testid': dataTestId,
  ...props
}: MenuContentProps) => (
  <RadixMenu.Content
    {...props}
    className={cx(menuVariants({}), className)}
    data-testid={dataTestId}
    sideOffset={sideOffset}
  />
);

MenuContent.displayName = 'MenuContent';
