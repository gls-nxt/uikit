import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { Prettify } from '@utils/types';
import type { ComponentProps } from 'react';

export type TabsContentProps = Prettify<
  ComponentProps<typeof TabsPrimitive.Content> & {
    'data-testid'?: string;
  }
>;

export const TabsContent = ({
  className,
  'data-testid': dataTestId,
  ...props
}: TabsContentProps) => {
  return <TabsPrimitive.Content data-testid={dataTestId} {...props} className={className} />;
};

TabsContent.displayName = 'TabsContent';

export default TabsContent;
