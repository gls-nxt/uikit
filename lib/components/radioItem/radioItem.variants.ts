import { cva, type VariantProps } from 'class-variance-authority';

import styles from './radioItem.module.css';

export const radioItemVariants = cva(styles.radioItem);
export const radioItemButtonVariants = cva(styles.radioItemButton);
export const radioItemIndicatorVariants = cva(styles.radioItemIndicator);
export const radioItemLabelVariants = cva(styles.radioItemLabel);

export type RadioItemVariants = VariantProps<typeof radioItemVariants>;
export type RadioItemButtonVariants = VariantProps<typeof radioItemButtonVariants>;
export type RadioItemIndicatorVariants = VariantProps<typeof radioItemIndicatorVariants>;
export type RadioItemLabelVariants = VariantProps<typeof radioItemLabelVariants>;
