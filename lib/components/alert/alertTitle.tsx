import type { ComponentPropsWithoutRef } from 'react';

import { Typography } from '../typography';

export type AlertTitleProps = ComponentPropsWithoutRef<typeof Typography>;

export const AlertTitle = ({
  children,
  fontWeight = 'medium',
  size = 3,
  ...props
}: AlertTitleProps) => (
  <Typography fontWeight={fontWeight} size={size} {...props}>
    {children}
  </Typography>
);

AlertTitle.displayName = 'AlertTitle';
