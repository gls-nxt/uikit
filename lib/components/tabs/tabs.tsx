import { TabsContent, type TabsContentProps } from '@components/tabsContent';
import { TabsList, type TabsListProps } from '@components/tabsList';
import { TabsTrigger, type TabsTriggerProps } from '@components/tabsTrigger';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { Prettify } from '@utils/types';

export type TabItem = {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

export type TabsProps = Prettify<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    items: TabItem[];
    tabsListProps?: Omit<TabsListProps, 'children' | 'size' | 'fullWidth'>;
    tabsTriggerProps?: Omit<TabsTriggerProps, 'value' | 'children' | 'slots'>;
    tabsContentProps?: Omit<TabsContentProps, 'value' | 'children'>;
    'data-testid'?: string;
    defaultValue?: string;
    size?: TabsListProps['size'];
    fullWidth?: boolean;
    className?: string;
  }
>;

export const Tabs: React.FC<TabsProps> = ({
  items,
  tabsListProps,
  tabsTriggerProps,
  tabsContentProps,
  'data-testid': dataTestId,
  defaultValue,
  size,
  fullWidth,
  className,
  ...rootProps
}) => {
  return (
    <TabsPrimitive.Root
      {...rootProps}
      className={className}
      data-testid={dataTestId}
      defaultValue={defaultValue}
    >
      <TabsList {...tabsListProps} fullWidth={fullWidth} size={size}>
        {items.map((item) => (
          <TabsTrigger
            disabled={item.disabled}
            key={item.value}
            value={item.value}
            {...tabsTriggerProps}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value} {...tabsContentProps}>
          {item.content}
        </TabsContent>
      ))}
    </TabsPrimitive.Root>
  );
};

export default Tabs;
