import { cx } from 'class-variance-authority';
import type React from 'react';

import { inputRootVariants } from './input.variants';
import { type InputInjectedProps, markInputSlot } from './inputSlots';

export type InputFieldProps = React.ComponentPropsWithoutRef<'label'> & {
  error?: boolean;
};

export const InputField = (componentProps: InputFieldProps) => {
  const { __inputError, className, error, ...props } = componentProps as InputFieldProps &
    InputInjectedProps;
  const state = error || __inputError ? 'error' : 'default';

  // biome-ignore lint/a11y/noLabelWithoutControl: Input.Control is rendered as a descendant of this label via composition.
  return <label {...props} className={cx(inputRootVariants({ state }), className)} />;
};

InputField.displayName = 'InputField';
markInputSlot(InputField, 'field');
