import * as RadioGroup from '@radix-ui/react-radio-group';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import { type ComponentProps, useId } from 'react';

import {
  radioItemButtonVariants,
  radioItemIndicatorVariants,
  radioItemLabelVariants,
  radioItemVariants,
} from './radioItem.variants';

export type RadioItemProps = Prettify<
  ComponentProps<typeof RadioGroup.Item> & {
    buttonClassName?: string;
    indicatorClassName?: string;
    labelClassName?: string;
    'data-testid'?: string;
  }
>;

export const RadioItem = ({
  children,
  id,
  className,
  buttonClassName,
  indicatorClassName,
  labelClassName,
  ref,
  'data-testid': dataTestId,
  ...props
}: RadioItemProps) => {
  const itemId = useId();
  const combinedClassName = cx(radioItemVariants({}), className);
  const combinedButtonClassName = cx(radioItemButtonVariants({}), buttonClassName);
  const combinedIndicatorClassName = cx(radioItemIndicatorVariants({}), indicatorClassName);
  const combinedLabelClassName = cx(radioItemLabelVariants({}), labelClassName);

  return (
    <div className={combinedClassName}>
      <RadioGroup.Item
        {...props}
        className={combinedButtonClassName}
        data-testid={dataTestId}
        id={id ?? itemId}
        ref={ref}
      >
        <RadioGroup.Indicator className={combinedIndicatorClassName} />
      </RadioGroup.Item>
      <label className={combinedLabelClassName} htmlFor={id ?? itemId}>
        {children}
      </label>
    </div>
  );
};

RadioItem.displayName = 'RadioItem';

export default RadioItem;
