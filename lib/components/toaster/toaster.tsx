import { useToasterState } from '@components/use-toast';

import { ToastProvider, ToastViewport } from '@radix-ui/react-toast';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { Toast } from '../toast/toast';

import styles from './toaster.module.css';

export type ToasterProps = Prettify<
  ComponentProps<typeof ToastProvider> & {
    viewportProps?: ComponentProps<typeof ToastViewport> & {
      'data-testid'?: string;
      className?: string;
    };
    maxVisibleToasts?: number;
  }
>;

export const Toaster = ({
  duration = 5000,
  swipeThreshold = 20,
  maxVisibleToasts = 10,
  viewportProps,
  ...props
}: ToasterProps) => {
  const { toasts } = useToasterState({ maxVisibleToasts });

  return (
    <ToastProvider swipeDirection="down" swipeThreshold={swipeThreshold} {...props}>
      {toasts.map((props) => (
        <Toast duration={duration} key={props.id} {...props} />
      ))}
      <ToastViewport asChild {...viewportProps}>
        <div
          aria-atomic="true"
          aria-live="assertive"
          className={cx(styles.toaster, viewportProps?.className)}
          role="status"
        />
      </ToastViewport>
    </ToastProvider>
  );
};

Toaster.displayName = 'Toaster';
