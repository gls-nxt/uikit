import { XIcon } from '@icons';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

import styles from './alert.module.css';

export type AlertCloseProps = Prettify<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'type'> & {
    'aria-label': string;
  }
>;

export const AlertClose = ({ 'aria-label': ariaLabel, className, ...props }: AlertCloseProps) => (
  <button
    {...props}
    aria-label={ariaLabel}
    className={cx(styles.alertClose, className)}
    type="button"
  >
    <XIcon height={20} width={20} />
  </button>
);

AlertClose.displayName = 'AlertClose';
