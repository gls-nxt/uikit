import { cva, type VariantProps } from 'class-variance-authority';

import styles from './tooltip.module.css';

export const tooltipVariants = cva(styles['tooltip-content'], {
  defaultVariants: {
    width: 'md',
  },
  variants: {
    width: {
      lg: styles['tooltip-content--lg'],
      md: styles['tooltip-content--md'],
      sm: styles['tooltip-content--sm'],
    },
  },
});

export const tooltipArrowVariants = cva(styles['tooltip-arrow']);

export const tooltipHeadingVariants = cva(styles['tooltip-heading']);

export type TooltipVariants = VariantProps<typeof tooltipVariants>;
export type TooltipHeadingVariants = VariantProps<typeof tooltipHeadingVariants>;
export type TooltipArrowVariants = VariantProps<typeof tooltipArrowVariants>;
