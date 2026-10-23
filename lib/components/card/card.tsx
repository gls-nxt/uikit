import { cx } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';

import { cardVariants } from './card.variants';

export type CardProps = ComponentPropsWithRef<'div'> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  raised?: boolean;
  className?: string;
  'data-testid'?: string;
};

export const Card = ({
  size,
  raised,
  className,
  'data-testid': dataTestId,
  children,
  ...props
}: CardProps) => {
  const generatedClassName = cardVariants({ raised, size });
  const combinedClassName = cx(generatedClassName, className);

  return (
    <div className={combinedClassName} data-testid={dataTestId} {...props}>
      {children}
    </div>
  );
};

Card.displayName = 'Card';

export default Card;
