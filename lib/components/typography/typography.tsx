import type { Prettify } from '@utils/types';

import { cx } from 'class-variance-authority';
import { createElement } from 'react';

import typographyVariants, { type TypographyVariants } from './typography.variants';

type PolymorphicProps<E extends React.ElementType> = React.PropsWithChildren<
  React.ComponentPropsWithRef<E> & {
    as?: E;
  }
>;

export type TypographyProps<T extends React.ElementType> = PolymorphicProps<T> &
  Prettify<
    TypographyVariants & {
      children: React.ReactNode;
      className?: string;
      'data-testid'?: string;
    }
  >;

function createTag({ variant, size, as }: TypographyVariants & { as?: React.ElementType }) {
  if (as) {
    return as;
  }

  switch (variant) {
    case 'heading': {
      return `h${size}`;
    }

    case 'body': {
      return 'span';
    }

    default: {
      return 'div';
    }
  }
}

export function Typography<T extends React.ElementType = 'h2'>({
  variant = 'body',
  size = 2,
  color,
  fontWeight,
  as,
  children,
  className,
  'data-testid': dataTestId,
  ...props
}: TypographyProps<T>) {
  const tag = createTag({ as, size, variant });
  const generatedClassName = typographyVariants({ color, fontWeight, size, variant });
  const combinedClassName = cx(generatedClassName, className);

  return createElement(
    tag,
    { ...props, className: combinedClassName, 'data-testid': dataTestId },
    children,
  );
}

export default Typography;
