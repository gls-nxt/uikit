import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './input.module.css';
import { type InputInjectedProps, markInputSlot } from './inputSlots';

export type InputLabelProps = React.ComponentPropsWithoutRef<'div'>;

export const InputLabel = (componentProps: InputLabelProps) => {
  const { __inputId, className, id, ...props } = componentProps as InputLabelProps &
    InputInjectedProps;
  const resolvedId = id ?? (__inputId ? `${__inputId}-label` : undefined);

  return <div {...props} className={cx(styles.inputLabel, className)} id={resolvedId} />;
};

InputLabel.displayName = 'InputLabel';
markInputSlot(InputLabel, 'label');
