import { Slot } from '@radix-ui/react-slot';
import { cx } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';
import { isValidElement } from 'react';

import styles from './input.module.css';
import { type InputInjectedProps, markInputSlot } from './inputSlots';

export type InputControlProps = InputHTMLAttributes<HTMLInputElement> & {
  asChild?: boolean;
  ref?: React.Ref<HTMLInputElement>;
};

export const InputControl = (componentProps: InputControlProps) => {
  const {
    __inputError,
    __inputErrorMessageId,
    __inputHelperTextId,
    __inputId,
    __inputRequired,
    'aria-describedby': ariaDescribedBy,
    asChild,
    children,
    className,
    id,
    required,
    type = 'text',
    ...props
  } = componentProps as InputControlProps & InputInjectedProps;
  const shouldUseSlot = asChild && isValidElement(children);
  const Component = shouldUseSlot ? Slot : 'input';
  const describedBy = [ariaDescribedBy, __inputErrorMessageId, __inputHelperTextId]
    .filter(Boolean)
    .join(' ');
  const resolvedId = id ?? __inputId;
  const resolvedRequired = required ?? __inputRequired;
  const slotChildren = shouldUseSlot ? children : null;

  return (
    <Component
      aria-describedby={describedBy || undefined}
      aria-invalid={__inputError}
      aria-required={resolvedRequired}
      className={cx(styles.input, className)}
      id={resolvedId}
      placeholder=""
      required={resolvedRequired}
      type={type}
      {...props}
    >
      {slotChildren}
    </Component>
  );
};

InputControl.displayName = 'InputControl';
markInputSlot(InputControl, 'control');
