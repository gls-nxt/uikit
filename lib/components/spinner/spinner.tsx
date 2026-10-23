import type { Prettify } from '@utils/types';

import { cx } from 'class-variance-authority';
import type { SVGProps } from 'react';

import { type SpinnerVariants, spinnerVariants } from './spinner.variants';

export type SpinnerProps = SVGProps<SVGSVGElement> &
  Prettify<{ testId?: string } & SpinnerVariants>;

export const Spinner = ({ size, color, className, testId, ...props }: SpinnerProps) => {
  return (
    <svg
      aria-hidden="true"
      className={cx(spinnerVariants({ color, size }), className)}
      data-testid={testId}
      fill="none"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.25 3.908c-.412-.797-.104-1.786.734-2.105A14.118 14.118 0 1 1 .891 14.505c.031-.896.869-1.507 1.755-1.373.887.134 1.484.963 1.483 1.86a10.87 10.87 0 1 0 7.36-10.28c-.849.29-1.826-.008-2.239-.804Z"
        fill="currentColor"
      />
    </svg>
  );
};
