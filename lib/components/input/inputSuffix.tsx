import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './input.module.css';

export type InputSuffixProps = React.ComponentPropsWithoutRef<'div'>;

export const InputSuffix = ({ className, ...props }: InputSuffixProps) => (
  <div {...props} className={cx(styles.inputAdornment, styles.inputAdornmentSuffix, className)} />
);

InputSuffix.displayName = 'InputSuffix';
