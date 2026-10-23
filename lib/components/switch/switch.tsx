import * as RadixSwitch from '@radix-ui/react-switch';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import { type ComponentProps, useId } from 'react';

import {
  type SwitchVariants,
  switchLabelVariants,
  switchRootVariants,
  switchThumbVariants,
  switchVariants,
} from './switch.variants';

export type SwitchProps = Prettify<
  ComponentProps<typeof RadixSwitch.Root> & {
    size?: SwitchVariants['size'];
    rootClassName?: string;
    thumbClassName?: string;
    labelClassName?: string;
    'data-testid'?: string;
  }
>;

export const Switch = ({
  children,
  id,
  size,
  className,
  rootClassName,
  thumbClassName,
  labelClassName,
  ref,
  'data-testid': dataTestId,
  ...props
}: SwitchProps) => {
  const switchId = useId();
  const combinedClassName = cx(switchVariants({ size }), className);
  const combinedRootClassName = cx(switchRootVariants({}), rootClassName);
  const combinedThumbClassName = cx(switchThumbVariants({}), thumbClassName);
  const combinedLabelClassName = cx(switchLabelVariants({}), labelClassName);

  return (
    <div className={combinedClassName}>
      <RadixSwitch.Root
        {...props}
        className={combinedRootClassName}
        data-testid={dataTestId}
        id={id ?? switchId}
        ref={ref}
      >
        <RadixSwitch.Thumb className={combinedThumbClassName} />
      </RadixSwitch.Root>
      <label className={combinedLabelClassName} htmlFor={id ?? switchId}>
        {children}
      </label>
    </div>
  );
};

Switch.displayName = 'Switch';

export default Switch;
