import { cva, type VariantProps } from 'class-variance-authority';

import styles from './tabsTrigger.module.css';
// Tabs Trigger Variants
export const tabsTriggerVariants = cva(styles['tabs-trigger']);

export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;
