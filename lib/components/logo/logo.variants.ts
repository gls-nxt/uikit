import { cva, type VariantProps } from 'class-variance-authority';

import styles from './logo.module.css';

const logoVariants = cva(styles.logo, {
  defaultVariants: {
    allowDarkMode: false,
    theme: 'light',
  },
  variants: {
    allowDarkMode: {
      true: styles['logo--allow-dark-mode'],
    },
    theme: {
      dark: styles['logo--theme-dark'],
      light: styles['logo--theme-light'],
    },
  },
});

export type LogoVariants = VariantProps<typeof logoVariants>;
export default logoVariants;
