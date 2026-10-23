import { Button } from '@components/button';
import { Spinner } from '@components/spinner';
import { AlertCircleIcon, CheckIcon, XIcon } from '@icons';
import * as ToastPrimitives from '@radix-ui/react-toast';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import styles from './toast.module.css';
import { toastContentVariants } from './toast.variants';

export type ToastProps = Prettify<
  Omit<ComponentProps<typeof ToastPrimitives.Root>, 'title' | 'description' | 'prefix'> & {
    id: string;
    title?: ReactNode;
    description?: ReactNode;
    variant?: 'default' | 'pending' | 'success' | 'error';
    'data-testid'?: string;
    promise?: Promise<unknown>;
    action?: {
      label: string;
      onClick: () => void;
      altText: string;
      dismiss?: boolean;
    };
    close?: boolean;
    preserve?: boolean;
    prefix?: ReactElement | string;
    allowSwiping?: boolean;
  }
>;

export const Toast = ({
  className,
  duration,
  'data-testid': dataTestId,
  action,
  close = true,
  preserve = false,
  prefix,
  title,
  description,
  promise,
  variant = 'default',
  allowSwiping = true,
  ...props
}: ToastProps) => {
  const toastContentClassName = toastContentVariants({
    alignItems: description ? 'start' : 'center',
  });
  const isPending = variant === 'pending';
  const isSuccess = variant === 'success';
  const isError = variant === 'error';

  const handleSwipeEnd = (
    e: Parameters<NonNullable<ComponentProps<typeof ToastPrimitives.Root>['onSwipeEnd']>>[0],
  ) => {
    if (!allowSwiping) {
      e.preventDefault();
    }
  };

  return (
    <ToastPrimitives.Root
      className={cx(styles.root, className)}
      data-testid={dataTestId}
      duration={promise || isPending || preserve ? Number.POSITIVE_INFINITY : duration}
      {...props}
      asChild
      data-allow-swiping={allowSwiping}
      data-preserve={Boolean(preserve)}
      data-promise={Boolean(promise)}
      onSwipeEnd={handleSwipeEnd}
    >
      <div>
        <div className={toastContentClassName}>
          <div className={styles.prefix}>
            {prefix ? <div aria-hidden={true}>{prefix}</div> : null}

            {isPending && !prefix ? (
              <span className={styles.loader}>
                <Spinner color="inverted" size="sm" />
              </span>
            ) : null}
            {isSuccess && !prefix ? (
              <span className={styles.icon}>
                <CheckIcon height={18} width={18} />
              </span>
            ) : null}
            {isError && !prefix ? (
              <span className={styles.icon}>
                <AlertCircleIcon height={18} width={18} />
              </span>
            ) : null}
          </div>
          <div>
            {title ? (
              <ToastPrimitives.Title className={styles.heading}>{title}</ToastPrimitives.Title>
            ) : null}
            {description ? (
              <ToastPrimitives.Description className={styles.description}>
                {description}
              </ToastPrimitives.Description>
            ) : null}
          </div>
        </div>

        <div className={styles.endContent}>
          {action ? (
            <ToastPrimitives.ToastAction altText={action.altText} asChild>
              <Button
                className={styles.action}
                color="secondary"
                onClick={action?.onClick}
                size="xs"
              >
                {action.label}
              </Button>
            </ToastPrimitives.ToastAction>
          ) : null}

          {close ? (
            <ToastPrimitives.Close asChild>
              <Button
                aria-label="toast-close-button"
                className={styles.close}
                color="tertiary"
                data-toast-close
                size="xs"
              >
                <XIcon height={14} width={14} />
              </Button>
            </ToastPrimitives.Close>
          ) : null}
        </div>
      </div>
    </ToastPrimitives.Root>
  );
};

Toast.displayName = 'Toast';
