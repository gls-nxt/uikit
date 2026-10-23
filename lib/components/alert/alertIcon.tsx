import { AlertCircleIcon, AlertTriangleIcon, InfoIcon } from '@icons';
import { cx } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import styles from './alert.module.css';

// The icon is purely decorative, so aria-hidden is always applied and cannot be overridden
export type AlertIconProps = Omit<HTMLAttributes<HTMLDivElement>, 'aria-hidden'>;

export const AlertIcon = ({ children, className, ...props }: AlertIconProps) => (
  <div {...props} aria-hidden className={cx(styles.alertIcon, className)}>
    {children ?? (
      <>
        <span className={styles.alertIconInfo}>
          <InfoIcon height={20} width={20} />
        </span>
        <span className={styles.alertIconWarning}>
          <AlertCircleIcon height={20} width={20} />
        </span>
        <span className={styles.alertIconError}>
          <AlertTriangleIcon height={20} width={20} />
        </span>
      </>
    )}
  </div>
);

AlertIcon.displayName = 'AlertIcon';
