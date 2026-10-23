import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { Prettify } from '@utils/types';
import type { ReactNode } from 'react';

import { type TabsTriggerVariants, tabsTriggerVariants } from './tabsTrigger.variants';

export type TabsTriggerProps = Prettify<
  Omit<React.ComponentProps<typeof TabsPrimitive.Trigger>, 'prefix' | 'badge'> &
    TabsTriggerVariants & {
      children: ReactNode;
      'data-testid'?: string;
    }
>;

export const TabsTrigger = ({
  className,
  'data-testid': dataTestId,
  ...props
}: TabsTriggerProps) => {
  const defaultClassName = tabsTriggerVariants();

  return (
    <TabsPrimitive.Trigger
      data-testid={dataTestId}
      {...props}
      className={`${defaultClassName} ${className}`}
    >
      {props.children}
    </TabsPrimitive.Trigger>
  );
};

TabsTrigger.displayName = 'TabsTrigger';

export default TabsTrigger;
