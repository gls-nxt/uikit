import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './input.module.css';

export type InputPrefixProps = React.ComponentPropsWithoutRef<'div'>;

export const InputPrefix = ({ className, ...props }: InputPrefixProps) => (
  <div {...props} className={cx(styles.inputAdornment, styles.inputAdornmentPrefix, className)} />
);

InputPrefix.displayName = 'InputPrefix';
