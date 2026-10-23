import typographyVariants from '@components/typography/typography.variants';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { Prettify } from '@utils/types';
import type { ComponentProps } from 'react';

import { type TabsListVariants, tabsListVariants } from './tabsList.variants';

export type TabsListProps = Prettify<
  ComponentProps<typeof TabsPrimitive.List> &
    TabsListVariants & {
      'data-testid'?: string;
    }
>;

export const TabsList = ({
  size,
  fullWidth,
  className,
  'data-testid': dataTestId,
  ...props
}: TabsListProps) => {
  const defaultClassName = tabsListVariants({ fullWidth, size });
  const typographyClassName = typographyVariants({
    fontWeight: 'regular',
    size: size === 'large' ? 3 : 4,
    variant: 'label',
  });

  return (
    <TabsPrimitive.List
      data-testid={dataTestId}
      {...props}
      className={`${defaultClassName} ${className} ${typographyClassName}`}
    />
  );
};

TabsList.displayName = 'TabsList';

export default TabsList;
