import type { Prettify } from '@utils/types';
import {
  type AriaAttributes,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './listBox.module.css';
import { type ListVariants, listVariants } from './listBox.variants';

export type Option = {
  id: string;
  value: string;
};

export type ListBoxProps<T extends Option = Option> = Prettify<
  {
    id: string;
    options: T[];
    selected?: string;
    className?: string;
    anchorRef?: RefObject<HTMLElement | null>;
    scrollToSelected?: boolean;
    testId?: string;
    ref?: Ref<HTMLDivElement>;
    style?: CSSProperties;
    children?: (option: T) => ReactNode;
    onSelect?: (option: T) => void;
  } & ListVariants &
    AriaAttributes
>;

function scrollIntoView(node?: HTMLElement) {
  node?.scrollIntoView({
    block: 'start',
    inline: 'center',
  });
}

export const ListBox = <T extends Option = Option>({
  scrollIndicator,
  scrollToSelected = true,
  options,
  selected,
  className,
  anchorRef,
  testId,
  children,
  onSelect,
  ref,
  style,
  ...props
}: ListBoxProps<T>) => {
  const [focusedIndex, setFocusedIndex] = useState<number>();

  const itemsRef = useRef<Map<number, HTMLElement>>(new Map());

  const selectedIndex = useMemo(() => {
    const selectedIndex = options.findIndex((option) => option.id === selected);
    return selectedIndex === -1 ? 0 : selectedIndex;
  }, [options, selected]);

  useEffect(() => {
    if (scrollToSelected) {
      scrollIntoView(itemsRef.current.get(selectedIndex));
    }
  }, [selectedIndex, scrollToSelected]);

  const listClassName = useMemo(
    () =>
      listVariants({
        scrollIndicator,
      }),
    [scrollIndicator],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const index = focusedIndex ?? -1;

      const map = itemsRef.current;

      switch (event.key) {
        case 'ArrowUp': {
          event.preventDefault();
          const prev = Math.max(index - 1, -1);

          if (prev === -1) {
            anchorRef?.current?.focus();
          }

          map.get(prev)?.focus();
          break;
        }

        case 'ArrowDown': {
          event.preventDefault();
          const next = Math.min(index + 1, options.length - 1);

          map.get(next)?.focus();
          break;
        }

        case 'Enter':
          event.preventDefault();
          break;

        default:
          anchorRef?.current?.focus();
      }
    },
    [anchorRef, options.length, focusedIndex],
  );

  const handleFocus = useCallback(() => {
    setFocusedIndex(selectedIndex);
    itemsRef.current.get(selectedIndex)?.focus();
  }, [selectedIndex]);

  return (
    <div className={styles.wrapper} data-testid={testId} style={style}>
      <div
        className={`${listClassName} ${className}`}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        ref={ref}
        role="listbox"
        tabIndex={0}
        {...props}
      >
        {options.map((option, index) => (
          <ListBoxRow
            hasFocus={index === focusedIndex}
            index={index}
            isSelected={selected === option.id}
            itemsRef={itemsRef}
            key={option.id}
            onFocusIndex={setFocusedIndex}
            onSelect={onSelect}
            option={option}
            setSize={options.length}
          >
            {children}
          </ListBoxRow>
        ))}
      </div>
    </div>
  );
};

ListBox.displayName = 'ListBox';

type ListBoxRowProps<T extends Option = Option> = {
  hasFocus: boolean;
  index: number;
  isSelected: boolean;
  itemsRef: RefObject<Map<number, HTMLElement>>;
  option: T;
  setSize: number;
  children?: (option: T) => ReactNode;
  onFocusIndex: (index: number) => void;
  onSelect?: (option: T) => void;
};

const ListBoxRow = <T extends Option = Option>({
  hasFocus,
  index,
  isSelected,
  itemsRef,
  option,
  setSize,
  children,
  onFocusIndex,
  onSelect,
}: ListBoxRowProps<T>) => {
  const handleFocus = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onFocusIndex(index);
    },
    [index, onFocusIndex],
  );

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      const map = itemsRef.current;

      if (node) {
        map.set(index, node);
      } else {
        map.delete(index);
      }
    },
    [index, itemsRef],
  );

  return (
    <ListBoxItem
      aria-posinset={index + 1}
      aria-setsize={setSize}
      hasFocus={hasFocus}
      isSelected={isSelected}
      onFocus={handleFocus}
      onSelect={onSelect}
      option={option}
      ref={setRef}
    >
      {children}
    </ListBoxItem>
  );
};

type ListBoxItemProps<T extends Option = Option> = {
  hasFocus: boolean;
  isSelected: boolean;
  option: T;
  ref?: Ref<HTMLDivElement>;
  children?: (option: T) => ReactNode;
  onFocus: (event: FocusEvent<HTMLDivElement>) => void;
  onSelect?: (option: T) => void;
} & AriaAttributes;

export const ListBoxItem = <T extends Option = Option>({
  option,
  isSelected,
  hasFocus,
  onSelect,
  children,
  ref,
  ...props
}: ListBoxItemProps<T>) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'Enter':
          onSelect?.(option);
          break;
      }
    },
    [option, onSelect],
  );

  const handleClick = useCallback(() => {
    onSelect?.(option);
  }, [option, onSelect]);

  // Keep focus on the input: losing it collapses the mobile keyboard, which
  // resizes the viewport and moves this row before the click can fire. Native
  // pointer events steal focus on pointerdown, WebKit on the mousedown it
  // synthesises after touchend. Cancelling either still allows the click.
  const handleFocusStealingEvent = useCallback(
    (event: MouseEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );

  return (
    <div
      aria-selected={isSelected}
      className={styles.item}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseDown={handleFocusStealingEvent}
      onPointerDown={handleFocusStealingEvent}
      ref={ref}
      role="option"
      tabIndex={hasFocus ? 0 : -1}
      {...props}
    >
      {children?.(option) ?? option.value}
    </div>
  );
};

ListBoxItem.displayName = 'ListBoxItem';
