import { cva, type VariantProps } from 'class-variance-authority';

import styles from './menu.module.css';

export const menuVariants = cva(styles.menuContent);

export type MenuVariants = VariantProps<typeof menuVariants>;
