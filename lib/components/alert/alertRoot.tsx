import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { type AlertVariants, alertVariants } from './alert.variants';

export type AlertRootProps = Prettify<HTMLAttributes<HTMLDivElement> & AlertVariants>;

export const AlertRoot = ({
  variant = 'info',
  shadow = true,
  className,
  children,
  ...props
}: AlertRootProps) => {
  const resolvedVariant = variant ?? 'info';
  const combinedClassName = cx(alertVariants({ shadow, variant: resolvedVariant }), className);

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

AlertRoot.displayName = 'AlertRoot';
