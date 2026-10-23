import { cva, type VariantProps } from 'class-variance-authority';

import styles from './popover.module.css';

export const popoverVariants = cva(styles['popover-content'], {
  defaultVariants: {
    width: 'md',
  },
  variants: {
    width: {
      lg: styles['popover-content--lg'],
      md: styles['popover-content--md'],
      sm: styles['popover-content--sm'],
    },
  },
});

export const popoverArrowVariants = cva(styles['popover-arrow']);

export const popoverHeadingVariants = cva(styles['popover-heading']);

export type PopoverVariants = VariantProps<typeof popoverVariants>;
export type PopoverHeadingVariants = VariantProps<typeof popoverHeadingVariants>;
export type PopoverArrowVariants = VariantProps<typeof popoverArrowVariants>;
