import { CheckIcon } from '@icons';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import { type InputHTMLAttributes, type ReactNode, useId } from 'react';
import styles from './checkbox.module.css';
import {
  type CheckboxInputVariants,
  checkboxIndicatorVariants,
  checkboxInputVariants,
  checkboxLabelVariants,
  checkboxVariants,
} from './checkbox.variants';

export type CheckboxProps = Prettify<
  InputHTMLAttributes<HTMLInputElement> &
    CheckboxInputVariants & {
      inputClassName?: string;
      indicatorClassName?: string;
      labelClassName?: string;
      error?: boolean;
      errorMessage?: ReactNode;
    }
>;

export const Checkbox = ({
  children,
  className,
  inputClassName,
  indicatorClassName,
  labelClassName,
  error = false,
  errorMessage,
  alignTop = false,
  ...props
}: CheckboxProps) => {
  const combinedClassName = cx(checkboxVariants({}), className);
  const combinedInputClassName = cx(
    checkboxInputVariants({
      alignTop,
      state: error ? 'error' : 'default',
    }),
    inputClassName,
  );
  const combinedIndicatorClassName = cx(checkboxIndicatorVariants({}), indicatorClassName);
  const combinedLabelClassName = cx(checkboxLabelVariants({}), labelClassName);

  const generatedId = useId();
  const id = props.id ?? generatedId;

  return (
    <div className={combinedClassName}>
      <label className={combinedLabelClassName}>
        <input
          aria-invalid={error}
          aria-required={props.required}
          type="checkbox"
          {...props}
          id={id}
        />
        <span aria-hidden="true" className={combinedInputClassName}>
          <CheckIcon className={combinedIndicatorClassName} />
        </span>
        {children}
      </label>
      <div
        aria-atomic="true"
        aria-live="polite"
        className={styles.errorMessage}
        id={`${id}-error-message`}
        role="status"
      >
        {errorMessage}
      </div>
    </div>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
