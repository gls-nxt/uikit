import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './dialog.module.css';

export type DialogHeaderProps = Prettify<
  React.ComponentPropsWithoutRef<'div'> & {
    ref?: React.Ref<HTMLDivElement>;
  }
>;

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div {...props} className={cx(styles.dialogHeader, className)} />
);

DialogHeader.displayName = 'DialogHeader';
