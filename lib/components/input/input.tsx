export { InputControl, type InputControlProps } from './inputControl';
export { InputErrorMessage, type InputErrorMessageProps } from './inputErrorMessage';
export { InputField, type InputFieldProps } from './inputField';
export { InputHelperText, type InputHelperTextProps } from './inputHelperText';
export { InputLabel, type InputLabelProps } from './inputLabel';
export { InputMain, type InputMainProps } from './inputMain';
export { InputPrefix, type InputPrefixProps } from './inputPrefix';
export { InputRoot, type InputRootProps } from './inputRoot';
export { InputSuffix, type InputSuffixProps } from './inputSuffix';

import type { Prettify } from '@utils/types';
import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { useId } from 'react';

import type { InputRootVariants, WrapperVariants } from './input.variants';
import { InputControl } from './inputControl';
import { InputErrorMessage } from './inputErrorMessage';
import { InputField } from './inputField';
import { InputHelperText } from './inputHelperText';
import { InputLabel } from './inputLabel';
import { InputMain } from './inputMain';
import { InputPrefix } from './inputPrefix';
import { InputRoot } from './inputRoot';
import { InputSuffix } from './inputSuffix';

export type InputProps = Prettify<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
    InputRootVariants &
    WrapperVariants & {
      ref?: React.Ref<HTMLInputElement>;
      /**
       * @deprecated Use `Input.Label` inside `Input.Main` instead.
       */
      label?: string;
      error?: boolean;
      /**
       * @deprecated Use `Input.ErrorMessage` inside `Input.Root` instead.
       */
      errorMessage?: ReactNode;
      fullWidth?: boolean;
      /**
       * @deprecated Use `Input.HelperText` inside `Input.Root` instead.
       */
      helperText?: ReactNode;
      /**
       * @deprecated Use `Input.Prefix` / `Input.Suffix` inside `Input.Field` instead.
       */
      slots?: {
        prefix?: ReactElement | string;
        suffix?: ReactElement | string;
      };
      className?: string;
      /**
       * @deprecated Use `className` on `Input.Label` instead.
       */
      labelClassName?: string;
      'data-testid'?: string;
    }
>;

const InputLegacy = ({
  label,
  error = false,
  errorMessage,
  fullWidth = false,
  helperText,
  slots = {},
  className,
  size,
  labelClassName,
  id,
  required,
  ...props
}: InputProps) => {
  const generatedId = useId();

  return (
    <InputRoot
      className={className}
      error={error}
      fullWidth={fullWidth}
      id={id ?? generatedId}
      labelled={!!label}
      required={required}
      size={size}
    >
      <InputField>
        {slots?.prefix ? <InputPrefix>{slots.prefix}</InputPrefix> : null}
        <InputMain>
          <InputControl {...props} />
          {label ? <InputLabel className={labelClassName}>{label}</InputLabel> : null}
        </InputMain>
        {slots?.suffix ? <InputSuffix>{slots.suffix}</InputSuffix> : null}
      </InputField>
      {helperText ? <InputHelperText>{helperText}</InputHelperText> : null}
      {/* Live region must exist from first render so screen readers announce changes */}
      <InputErrorMessage>{errorMessage}</InputErrorMessage>
    </InputRoot>
  );
};

InputLegacy.displayName = 'Input';

export const Input = Object.assign(InputLegacy, {
  Control: InputControl,
  ErrorMessage: InputErrorMessage,
  Field: InputField,
  HelperText: InputHelperText,
  Label: InputLabel,
  Main: InputMain,
  Prefix: InputPrefix,
  Root: InputRoot,
  Suffix: InputSuffix,
});

export default Input;
