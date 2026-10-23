import { Slot, Slottable } from '@radix-ui/react-slot';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ElementType, ReactElement } from 'react';
import { isValidElement } from 'react';

import { Spinner } from '../spinner';

import { type ButtonVariants, buttonVariants, iconWrapperVariants } from './button.variants';

export type ButtonProps = Prettify<
  ButtonVariants &
    ButtonHTMLAttributes<HTMLButtonElement> & {
      component?: ElementType;
      href?: string;
      ref?: React.Ref<HTMLButtonElement>;
      fullWidth?: boolean;
      startIcon?: ReactElement;
      endIcon?: ReactElement;
      asChild?: boolean;
      className?: string;
      loadingMessage?: string;
      'data-testid'?: string;
    }
>;

export const Button = ({
  color,
  size,
  fullWidth,
  asChild,
  startIcon,
  endIcon,
  'data-testid': dataTestId,
  children,
  className,
  loading,
  loadingMessage,
  disabled,
  ...props
}: ButtonProps) => {
  const Component = asChild && isValidElement(children) ? Slot : 'button';

  const generatedClassName = buttonVariants({ color, fullWidth, loading, size });
  const combinedClassName = cx(generatedClassName, className);
  const iconWrapperClassName = iconWrapperVariants({ size });
  const content = loading ? (loadingMessage ?? children) : children;

  return (
    <Component
      className={combinedClassName}
      data-testid={dataTestId}
      disabled={disabled || Boolean(loading)}
      {...props}
    >
      {loading ? <Spinner color="inherit" size={size === 'lg' ? 'md' : size} /> : null}

      {!loading && startIcon ? <span className={iconWrapperClassName}>{startIcon}</span> : null}

      <Slottable>{content}</Slottable>

      {!loading && endIcon ? <span className={iconWrapperClassName}>{endIcon}</span> : null}
    </Component>
  );
};

Button.displayName = 'Button';

export default Button;
