import type { ComponentType, SVGProps } from 'react';

import { Icon, type IconProps } from './icon';

export const createIcon = (SvgComponent: ComponentType<SVGProps<SVGSVGElement>>) => {
  return (props: IconProps) => (
    <Icon {...props}>
      <SvgComponent />
    </Icon>
  );
};
