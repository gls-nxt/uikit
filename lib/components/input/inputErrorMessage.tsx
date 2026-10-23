import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './input.module.css';
import { type InputInjectedProps, markInputSlot } from './inputSlots';

export type InputErrorMessageProps = React.ComponentPropsWithoutRef<'div'>;

export const InputErrorMessage = (componentProps: InputErrorMessageProps) => {
  const { __inputErrorMessageId, children, className, id, ...props } =
    componentProps as InputErrorMessageProps & InputInjectedProps;
  const resolvedId = id ?? __inputErrorMessageId;

  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      role="status"
      {...props}
      className={cx(styles.errorMessage, className)}
      id={resolvedId}
    >
      {children}
    </div>
  );
};

InputErrorMessage.displayName = 'InputErrorMessage';
markInputSlot(InputErrorMessage, 'errorMessage');
