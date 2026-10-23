import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './dialog.module.css';

export type DialogTitleProps = Prettify<
  React.ComponentPropsWithoutRef<'h2'> & {
    ref?: React.Ref<HTMLHeadingElement>;
    visuallyHidden?: boolean;
  }
>;

export const DialogTitle = ({ className, visuallyHidden = false, ...props }: DialogTitleProps) => (
  <h2
    {...props}
    className={cx(styles.dialogTitle, visuallyHidden && styles.visuallyHidden, className)}
  />
);

DialogTitle.displayName = 'DialogTitle';
