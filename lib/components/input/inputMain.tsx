import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './input.module.css';

export type InputMainProps = React.ComponentPropsWithoutRef<'div'>;

export const InputMain = ({ className, ...props }: InputMainProps) => (
  <div {...props} className={cx(styles.inputMain, className)} />
);

InputMain.displayName = 'InputMain';
