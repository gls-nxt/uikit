import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './input.module.css';
import { type InputInjectedProps, markInputSlot } from './inputSlots';

export type InputHelperTextProps = React.ComponentPropsWithoutRef<'p'>;

export const InputHelperText = (componentProps: InputHelperTextProps) => {
  const { __inputHelperTextId, children, className, id, ...props } =
    componentProps as InputHelperTextProps & InputInjectedProps;
  const resolvedId = id ?? __inputHelperTextId;

  return (
    <p {...props} className={cx(styles.inputHelperText, className)} id={resolvedId}>
      {children}
    </p>
  );
};

InputHelperText.displayName = 'InputHelperText';
markInputSlot(InputHelperText, 'helperText');
