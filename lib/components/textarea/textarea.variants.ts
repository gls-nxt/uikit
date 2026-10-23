import { cva, type VariantProps } from 'class-variance-authority';

import styles from './textarea.module.css';

export const wrapperVariants = cva(styles.textareaWrapper, {
  defaultVariants: {
    fullWidth: false,
    labelled: false,
  },
  variants: {
    fullWidth: {
      false: null,
      true: styles['textareaWrapper--fullWidth'],
    },
    labelled: {
      false: null,
      true: styles['textareaWrapper--labeled'],
    },
  },
});

export const textareaRootVariants = cva(styles.textareaRoot, {
  defaultVariants: {
    state: 'default',
  },
  variants: {
    state: {
      default: null,
      error: styles['textareaRoot--error'],
    },
  },
});

export const textareaVariants = cva(styles.textarea, {
  defaultVariants: {
    resize: 'vertical',
  },
  variants: {
    resize: {
      both: styles['textarea--resizeBoth'],
      none: styles['textarea--resizeNone'],
      vertical: styles['textarea--resizeVertical'],
    },
  },
});

export const labelVariants = cva(styles.textareaLabel);

export const helperTextVariants = cva(styles.textareaHelperText);

export type WrapperVariants = VariantProps<typeof wrapperVariants>;
export type TextareaRootVariants = VariantProps<typeof textareaRootVariants>;
export type TextareaVariants = VariantProps<typeof textareaVariants>;
export type LabelVariants = VariantProps<typeof labelVariants>;
export type HelperTextVariants = VariantProps<typeof helperTextVariants>;
