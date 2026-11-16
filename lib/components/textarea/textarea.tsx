import type { Prettify } from '@utils/types';

import { cx } from 'class-variance-authority';
import { type ReactNode, type TextareaHTMLAttributes, useId } from 'react';

import styles from './textarea.module.css';
import {
  helperTextVariants,
  labelVariants,
  type TextareaRootVariants,
  type TextareaVariants,
  textareaRootVariants,
  textareaVariants,
  type WrapperVariants,
  wrapperVariants,
} from './textarea.variants';

export type TextareaProps = Prettify<
  TextareaHTMLAttributes<HTMLTextAreaElement> &
    TextareaRootVariants &
    TextareaVariants &
    WrapperVariants & {
      ref?: React.Ref<HTMLTextAreaElement>;
      label?: string;
      error?: boolean;
      errorMessage?: ReactNode;
      fullWidth?: boolean;
      helperText?: ReactNode;
      className?: string;
      labelClassName?: string;
      'data-testid'?: string;
    }
>;

export const Textarea = ({
  label,
  error = false,
  errorMessage,
  fullWidth = false,
  helperText,
  className,
  autoResize,
  resize,
  labelClassName: customLabelClassName,
  ...props
}: TextareaProps) => {
  const wrapperClassName = cx(
    wrapperVariants({
      fullWidth,
      labelled: !!label,
    }),
    className,
  );
  const textareaRootClassName = textareaRootVariants({
    state: error ? 'error' : 'default',
  });
  const textareaClassName = textareaVariants({ autoResize, resize });
  const labelClassName = labelVariants();
  const helperTextClassName = helperTextVariants();

  const generatedId = useId();
  const id = props.id ?? generatedId;

  return (
    <div className={wrapperClassName}>
      <label className={textareaRootClassName}>
        <textarea
          aria-describedby={`${id}-error-message${helperText ? ` ${id}-helper-text` : ''}`}
          aria-invalid={error || undefined}
          aria-required={props.required}
          className={textareaClassName}
          id={id}
          placeholder=""
          {...props}
        />
        {label ? (
          <div className={cx(labelClassName, customLabelClassName)} id={`${id}-label`}>
            {label}
          </div>
        ) : null}
      </label>

      {helperText ? (
        <p className={helperTextClassName} id={`${id}-helper-text`}>
          {helperText}
        </p>
      ) : null}

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

Textarea.displayName = 'Textarea';

export default Textarea;
