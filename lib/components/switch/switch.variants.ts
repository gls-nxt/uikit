import { cva, type VariantProps } from 'class-variance-authority';

import styles from './switch.module.css';

export const switchVariants = cva(styles.switchWrapper, {
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      md: styles['switch--medium'],
      sm: styles['switch--small'],
    },
  },
});

export const switchRootVariants = cva(styles.switchRoot);
export const switchThumbVariants = cva(styles.switchThumb);
export const switchLabelVariants = cva(styles.switchLabel);

export type SwitchVariants = VariantProps<typeof switchVariants>;
export type SwitchButtonVariants = VariantProps<typeof switchRootVariants>;
export type SwitchIndicatorVariants = VariantProps<typeof switchThumbVariants>;
export type SwitchLabelVariants = VariantProps<typeof switchLabelVariants>;
