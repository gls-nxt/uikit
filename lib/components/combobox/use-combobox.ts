import {
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { InputProps } from '../input';
import type { Option } from '../listBox';

export function useCombobox<T extends Option = Option>({
  selected,
  options,
  inputRef,
  onChange,
  onClick,
  onOpenChange,
  onSelect,
}: {
  selected?: string;
  options: T[];
  inputRef: RefObject<HTMLElement | null>;
  onChange?: InputProps['onChange'];
  onClick?: InputProps['onClick'];
  onOpenChange?: (open: boolean) => void;
  onSelect: (option?: T) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.id === selected),
    [options, selected],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(selectedOption?.value ?? '');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange],
  );

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!isOpen) {
        handleOpenChange(true);
      }

      if (onChange) {
        onChange?.(event);
        return;
      }

      // If uncontrolled
      const value = event.target.value;
      setInputValue(value);

      if (selected) {
        onSelect(undefined);
      }

      setFilteredOptions(
        options.filter((item) => item.value.toLowerCase().includes(value.toLowerCase())),
      );
    },
    [isOpen, options, selected, onChange, onSelect, handleOpenChange],
  );

  const handleSelect = useCallback(
    (option: T) => {
      inputRef.current?.focus();

      handleOpenChange(false);
      onSelect(option);

      // If uncontrolled
      if (!onChange) {
        setInputValue(option.value);
        setFilteredOptions([option]);
      }
    },
    [inputRef, onChange, onSelect, handleOpenChange],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();

          if (!isOpen) {
            handleOpenChange(true);
            inputRef.current?.blur();
          } else {
            listRef.current?.focus();
          }
          break;

        case 'Tab':
          handleOpenChange(false);
          break;
      }
    },
    [handleOpenChange, inputRef, isOpen],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      if (!isOpen) {
        handleOpenChange(true);
      }
      onClick?.(event);
    },
    [isOpen, onClick, handleOpenChange],
  );

  return {
    anchorProps: {
      onChange: handleOnChange,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    filteredOptions,
    handleSelect,
    inputValue,
    isOpen,
    listRef,
    onOpenChange: handleOpenChange,
  };
}
