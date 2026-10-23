import { cva, type VariantProps } from 'class-variance-authority';

import styles from './checkbox.module.css';

export const checkboxVariants = cva(styles.checkboxWrapper);
export const checkboxInputVariants = cva(styles.checkboxInput, {
  defaultVariants: {
    state: 'default',
  },
  variants: {
    alignTop: {
      false: null,
      true: styles['checkboxInput--alignTop'],
    },
    state: {
      default: null,
      error: styles['checkboxInput--error'],
    },
  },
});
export const checkboxIndicatorVariants = cva(styles.checkboxIndicator);
export const checkboxLabelVariants = cva(styles.checkboxLabel);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
export type CheckboxInputVariants = VariantProps<typeof checkboxInputVariants>;
export type CheckboxIndicatorVariants = VariantProps<typeof checkboxIndicatorVariants>;
export type CheckboxLabelVariants = VariantProps<typeof checkboxLabelVariants>;
