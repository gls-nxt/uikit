import { RadioItem } from '@components/radioItem';

import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import { Children, type ComponentProps } from 'react';

import { radioGroupVariants } from './radioGroup.variants';

export type RadioOption =
  | string
  | {
      value: string;
      label: string;
      disabled?: boolean;
    };

export type RadioGroupProps = Prettify<
  ComponentProps<typeof RadixRadioGroup.Root> & {
    options?: RadioOption[];
    /** Marks the group as invalid. */
    error?: boolean;
    'data-testid'?: string;
  }
>;

export const RadioGroup = ({
  children,
  className,
  'data-testid': dataTestId,
  options,
  error,
  ref,
  ...props
}: RadioGroupProps) => {
  const combinedClassName = cx(radioGroupVariants({}), className);

  return (
    <RadixRadioGroup.Root
      {...props}
      aria-invalid={error || undefined}
      className={combinedClassName}
      data-testid={dataTestId}
      ref={ref}
    >
      {options
        ? options.map((option) => {
            const isObject = typeof option === 'object' && option !== null;
            const value = isObject ? option.value : option;
            const label = isObject ? option.label : option;
            const disabled = isObject ? option.disabled : false;
            return (
              <RadioItem disabled={disabled} key={value} value={value}>
                {label}
              </RadioItem>
            );
          })
        : Children.map(children, (child) => child)}
    </RadixRadioGroup.Root>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
