import type { Prettify } from '@utils/types';

import { cx } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';

import { type InputVariants, inputVariants } from './inputBase.variants';

export type InputBaseProps = Prettify<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
    InputVariants & {
      ref?: React.Ref<HTMLInputElement>;
      hasError?: boolean;
      className?: string;
    }
>;

export const InputBase = ({ hasError = false, className, size, ...props }: InputBaseProps) => {
  const inputClassName = cx(
    inputVariants({
      size,
    }),
    className,
  );

  return <input aria-invalid={hasError} className={inputClassName} type="text" {...props} />;
};

InputBase.displayName = 'InputBase';

export default InputBase;
