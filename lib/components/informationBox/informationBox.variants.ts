import { cva, type VariantProps } from 'class-variance-authority';

import styles from './informationBox.module.css';

export const informationBoxVariants = cva(styles.informationBox, {
  defaultVariants: {
    color: 'primary',
    exiting: false,
    fullWidth: false,
  },
  variants: {
    color: {
      destructive: styles['informationBox--destructive'],
      primary: styles['informationBox--primary'],
      secondary: styles['informationBox--secondary'],
      success: styles['informationBox--success'],
      tertiary: styles['informationBox--tertiary'],
      warning: styles['informationBox--warning'],
    },

    exiting: {
      false: null,
      true: styles['informationBox--exiting'],
    },
    fullWidth: {
      false: null,
      true: styles['informationBox--fullWidth'],
    },
  },
});

export type InformationBoxVariants = VariantProps<typeof informationBoxVariants>;
