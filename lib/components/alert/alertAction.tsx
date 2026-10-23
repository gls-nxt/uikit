import { cx } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import styles from './alert.module.css';

export type AlertActionProps = HTMLAttributes<HTMLDivElement>;

export const AlertAction = ({ className, ...props }: AlertActionProps) => (
  <div {...props} className={cx(styles.alertAction, className)} />
);

AlertAction.displayName = 'AlertAction';
