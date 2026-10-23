import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './dialog.module.css';

export type DialogBodyProps = Prettify<
  React.ComponentPropsWithoutRef<'div'> & {
    ref?: React.Ref<HTMLDivElement>;
  }
>;

export const DialogBody = ({ className, ...props }: DialogBodyProps) => (
  <div {...props} className={cx(styles.dialogBody, styles.dialogContent, className)} />
);

DialogBody.displayName = 'DialogBody';
