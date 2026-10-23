import * as Popover from '@radix-ui/react-popover';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cx } from 'class-variance-authority';
import {
  type ComponentPropsWithoutRef,
  cloneElement,
  isValidElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useId,
  useMemo,
  useRef,
} from 'react';

import { useOptionalDialogContext } from '../dialog/dialogContext';
import { Input, type InputProps } from '../input';
import { ListBox, type ListBoxProps, type Option } from '../listBox';
import styles from './combobox.module.css';
import { useCombobox } from './use-combobox';

export type ComboboxProps<T extends Option = Option> = {
  options: T[];
  onSelect: (option?: T) => void;
  children?: (option: T) => ReactNode;
  onClickOutside?: (event: Event) => void;
  onOpenChange?: (open: boolean) => void;
  selected?: T['id'];
  listFooter?: ReactNode;
  listFooterProps?: {
    onClick?: (event: React.MouseEvent) => void;
    closeOnClick?: boolean;
  };
  showEmptyListFooter?: boolean;
  size?: InputProps['size'];
  inputRef?: RefObject<HTMLInputElement | null>;
  inputProps?: Omit<
    InputProps,
    'role' | 'autoComplete' | 'aria-autocomplete' | 'aria-expanded' | 'aria-controls' | 'onKeyDown'
  >;
  emptyListPlaceholder?: ReactNode;
  className?: string;
  listTestId?: string;
  assistiveHint?: string;
  assistiveStatusMessage?: string;
  scrollIndicator?: ListBoxProps<T>['scrollIndicator'];
  scrollToSelected?: ListBoxProps<T>['scrollToSelected'];
  modal?: boolean;
  portalProps?: ComponentPropsWithoutRef<typeof Popover.Portal>;
  contentProps?: Omit<
    ComponentPropsWithoutRef<typeof Popover.Content>,
    | 'children'
    | 'onCloseAutoFocus'
    | 'onEscapeKeyDown'
    | 'onInteractOutside'
    | 'onOpenAutoFocus'
    | 'onPointerDownOutside'
  >;
  matchAnchorWidth?: boolean;
};

export const Combobox = <T extends Option = Option>({
  size,
  options,
  inputProps: { onChange, onClick, ...inputProps } = {},
  scrollIndicator,
  scrollToSelected,
  selected,
  listFooter,
  listFooterProps,
  showEmptyListFooter = true,
  assistiveHint,
  assistiveStatusMessage,
  emptyListPlaceholder,
  className,
  listTestId,
  children,
  onSelect,
  onClickOutside,
  modal,
  portalProps,
  contentProps,
  matchAnchorWidth = true,
  ...props
}: ComboboxProps<T>) => {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const localInputRef = useRef<HTMLInputElement>(null);
  const inputRef = props.inputRef ?? localInputRef;
  const dialogContext = useOptionalDialogContext();
  const portalContainer = portalProps?.container ?? dialogContext?.portalContainer ?? undefined;

  const { inputValue, filteredOptions, listRef, isOpen, anchorProps, onOpenChange, handleSelect } =
    useCombobox({
      inputRef,
      onChange,
      onClick,
      onOpenChange: props.onOpenChange,
      onSelect,
      options,
      selected,
    });

  const inputId = useId();
  const listId = useId();
  const assistiveHintId = useId();

  const preventEventOnInput = (event: Event) => {
    if (inputRef.current === document.activeElement) {
      event.preventDefault();
    }
  };

  const handleInteractionOutside = useCallback(
    (event: Event) => {
      const target = event.target;

      if (target instanceof Node && inputWrapperRef.current?.contains?.(target)) {
        event.preventDefault();
      } else {
        onClickOutside?.(event);
      }
    },
    [onClickOutside],
  );

  const handleEscapeKeydown = () => inputRef.current?.focus();

  const handleContentKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Tab') {
        onOpenChange(false);
      }
    },
    [onOpenChange],
  );

  const handleFooterClick = useCallback(
    (event: React.MouseEvent) => {
      if (listFooterProps?.closeOnClick !== false) {
        onOpenChange(false);
      }
      listFooterProps?.onClick?.(event);
    },
    [listFooterProps, onOpenChange],
  );

  const footerContent = useMemo(() => {
    if (!listFooter || !isValidElement(listFooter)) {
      return listFooter;
    }

    return cloneElement(listFooter, {
      onClick: handleFooterClick,
    } as React.HTMLAttributes<HTMLElement>);
  }, [listFooter, handleFooterClick]);

  const popoverContent =
    filteredOptions.length > 0 ? (
      <>
        <ListBox
          anchorRef={inputRef}
          aria-labelledby={inputProps?.id ?? inputId}
          className={cx(styles.list, !matchAnchorWidth && styles.listAutoWidth, className)}
          id={listId}
          onSelect={handleSelect}
          options={filteredOptions}
          ref={listRef}
          scrollIndicator={scrollIndicator}
          scrollToSelected={scrollToSelected}
          selected={selected}
          testId={listTestId}
        >
          {children}
        </ListBox>
        {footerContent}
      </>
    ) : (
      <>
        {emptyListPlaceholder}
        {showEmptyListFooter ? footerContent : null}
      </>
    );

  return (
    <Popover.Root modal={modal} onOpenChange={onOpenChange} open={isOpen}>
      <Popover.Anchor ref={inputWrapperRef}>
        <Input
          size={size}
          {...inputProps}
          {...anchorProps}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          autoComplete="off"
          id={inputProps?.id ?? inputId}
          ref={inputRef}
          role="combobox"
          value={inputProps.value ?? inputValue}
          {...(isOpen && { 'aria-controls': listId })}
          {...(assistiveHint && { 'aria-describedby': assistiveHintId })}
        />
        {assistiveHint ? (
          <VisuallyHidden id={assistiveHintId}>{assistiveHint}</VisuallyHidden>
        ) : null}
        <VisuallyHidden aria-atomic="true" aria-live="polite" role="status">
          {assistiveStatusMessage}
        </VisuallyHidden>
      </Popover.Anchor>

      <Popover.Portal {...portalProps} container={portalContainer}>
        <Popover.Content
          avoidCollisions={false}
          sideOffset={6}
          {...contentProps}
          className={cx(
            styles.popoverContent,
            listFooter ? styles.contentWithFooter : undefined,
            contentProps?.className,
          )}
          onCloseAutoFocus={preventEventOnInput}
          onEscapeKeyDown={handleEscapeKeydown}
          onInteractOutside={handleInteractionOutside}
          onKeyDown={handleContentKeyDown}
          onOpenAutoFocus={preventEventOnInput}
          onPointerDownOutside={handleInteractionOutside}
        >
          {isOpen ? popoverContent : null}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

Combobox.displayName = 'Combobox';
