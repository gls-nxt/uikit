import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';

import styles from './dialog.module.css';

export type DialogDescriptionProps = Prettify<
  React.ComponentPropsWithoutRef<'p'> & {
    ref?: React.Ref<HTMLParagraphElement>;
    visuallyHidden?: boolean;
  }
>;

export const DialogDescription = ({
  className,
  visuallyHidden = false,
  ...props
}: DialogDescriptionProps) => (
  <p
    {...props}
    className={cx(styles.dialogDescription, visuallyHidden && styles.visuallyHidden, className)}
  />
);

DialogDescription.displayName = 'DialogDescription';
