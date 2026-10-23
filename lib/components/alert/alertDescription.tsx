import type { ComponentPropsWithoutRef } from 'react';

import { Typography } from '../typography';

export type AlertDescriptionProps = ComponentPropsWithoutRef<typeof Typography>;

export const AlertDescription = ({ children, size = 4, ...props }: AlertDescriptionProps) => (
  <Typography size={size} {...props}>
    {children}
  </Typography>
);

AlertDescription.displayName = 'AlertDescription';
