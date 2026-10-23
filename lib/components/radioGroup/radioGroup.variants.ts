import { cva, type VariantProps } from 'class-variance-authority';

import styles from './radioGroup.module.css';

export const radioGroupVariants = cva(styles.radioGroup);

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
