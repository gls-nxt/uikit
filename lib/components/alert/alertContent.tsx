import { cx } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import styles from './alert.module.css';

export type AlertContentProps = HTMLAttributes<HTMLDivElement>;

export const AlertContent = ({ className, ...props }: AlertContentProps) => (
  <div {...props} className={cx(styles.alertContent, className)} />
);

AlertContent.displayName = 'AlertContent';
