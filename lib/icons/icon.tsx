import { cx } from 'class-variance-authority';
import { cloneElement, isValidElement, type ReactElement, type SVGProps } from 'react';

import { type IconVariants, iconVariants } from './icon.variants';

export type IconProps = IconVariants & SVGProps<SVGSVGElement>;

export const Icon = ({ size, color, className, children, width, height, ...props }: IconProps) => {
  const generatedClassName = iconVariants({ color, size });
  const combinedClassName = cx(generatedClassName, className);

  if (!isValidElement<SVGProps<SVGSVGElement>>(children)) {
    return null;
  }

  const style = width && height ? { height, width } : undefined;

  return cloneElement(children as ReactElement<SVGProps<SVGSVGElement>>, {
    className: combinedClassName,
    style,
    ...props,
  });
};

Icon.displayName = 'Icon';
