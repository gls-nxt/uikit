import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './dialog.module.css';

export type DialogFooterProps = Prettify<
  React.ComponentPropsWithoutRef<'div'> & {
    ref?: React.Ref<HTMLDivElement>;
  }
>;

export const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div {...props} className={cx(styles.dialogFooter, className)} />
);

DialogFooter.displayName = 'DialogFooter';
