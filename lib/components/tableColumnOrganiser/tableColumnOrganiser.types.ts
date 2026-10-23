import type { PopoverProps } from '@components/popover';
import type { CSSProperties, ReactElement, ReactNode } from 'react';

export type TableColumnOrganiserItem = {
  /** Stable id matching the corresponding table column id. */
  id: string;
  /** Already-localized label shown beside the visibility checkbox. */
  label: string;
  /** Current controlled visibility state. */
  visible: boolean;
  /** Set to false when the column must always remain visible. */
  hideable?: boolean;
  /** Set to false to pin the column at its current position. */
  reorderable?: boolean;
};

export type TableColumnOrganiserProps = {
  /** Columns in their current effective order. */
  items: readonly TableColumnOrganiserItem[];
  /** Label for the default trigger button. */
  triggerLabel: string;
  /** Returns the localized accessible label for a column's drag handle. */
  getReorderLabel: (item: TableColumnOrganiserItem) => string;
  /** Called with the complete next column order. */
  onReorder: (orderedIds: string[]) => void;
  /** Called with the column id and its next visibility state. */
  onVisibilityChange: (id: string, visible: boolean) => void;
  /** Optional reset callback. The action renders only when a label is also supplied. */
  onReset?: () => void;
  /** Already-localized reset action label. */
  resetLabel?: string;
  /** Whether preferences differ from their defaults. */
  isModified?: boolean;
  /** Optional panel heading. */
  heading?: ReactNode;
  /** Optional content shown instead of an empty list. */
  emptyContent?: ReactNode;
  /** Checkbox group name. */
  name?: string;
  /** Replace the default UI-kit trigger button. */
  trigger?: ReactElement;
  /** Class applied to the default trigger button. */
  triggerClassName?: string;
  /** Class applied to the popover panel. */
  panelClassName?: string;
  /** Inline styles applied to the popover panel. */
  panelStyle?: CSSProperties;
  /** Controlled popover state. */
  open?: boolean;
  /** Initial popover state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the popover state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Preferred popover alignment. */
  align?: PopoverProps['align'];
  /** Preferred side of the trigger. */
  side?: PopoverProps['side'];
  /** Distance between the trigger and panel. */
  sideOffset?: number;
};
