import { cx } from 'class-variance-authority';
import type { ReactNode } from 'react';

import styles from './comboboxItem.module.css';

export type ComboboxItemProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

export const ComboboxItem = ({ children, className, disabled }: ComboboxItemProps) => {
  const combinedClassName = cx(styles.item, disabled && styles.itemDisabled, className);

  return (
    <div aria-disabled={disabled} className={combinedClassName}>
      {children}
    </div>
  );
};

ComboboxItem.displayName = 'ComboboxItem';
