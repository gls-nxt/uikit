import { Slot, Slottable } from '@radix-ui/react-slot';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { isValidElement } from 'react';

import { Spinner } from '../spinner';
import styles from './iconButton.module.css';
import { type ButtonVariants, buttonVariants } from './iconButton.variants';

export type IconButtonProps = Prettify<
  ButtonVariants &
    ButtonHTMLAttributes<HTMLButtonElement> & {
      asChild?: boolean;
      icon: ReactElement | string;
      label: string;
      children?: ReactElement;
      className?: string;
      ref?: React.Ref<HTMLButtonElement>;
      'data-testid'?: string;
    }
>;

export const IconButton = ({
  color,
  size,
  asChild = false,
  children,
  shape,
  icon,
  label,
  className,
  loading,
  disabled,
  ...props
}: IconButtonProps) => {
  const Component = asChild && isValidElement(children) ? Slot : 'button';

  return (
    <Component
      className={cx(className, buttonVariants({ color, loading, shape, size }))}
      disabled={disabled || Boolean(loading)}
      {...props}
    >
      <Slottable>{children}</Slottable>

      {loading ? (
        <Spinner color="inherit" size={size === 'lg' ? 'md' : size} />
      ) : (
        <div className={styles.icon}>{icon}</div>
      )}
      <VisuallyHidden>{label}</VisuallyHidden>
    </Component>
  );
};

IconButton.displayName = 'IconButton';
