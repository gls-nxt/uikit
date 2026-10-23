import { XIcon } from '@icons';
import { Slot } from '@radix-ui/react-slot';
import type { Prettify } from '@utils/types';
import { useInvokerFallbackClick } from '@utils/useInvokerFallbackClick';
import { cx } from 'class-variance-authority';
import type React from 'react';
import { isValidElement, useCallback } from 'react';

import styles from './dialog.module.css';
import { useOptionalDialogContext } from './dialogContext';
import { closeDialog } from './dialogInvokerFallback';

type DialogCloseCommand = 'close' | 'request-close';

export type DialogCloseProps = Prettify<
  Omit<React.ComponentPropsWithoutRef<'button'>, 'command' | 'commandfor' | 'type'> & {
    asChild?: boolean;
    command?: DialogCloseCommand;
    dialogId?: string;
    ref?: React.Ref<HTMLButtonElement>;
  }
>;

export const DialogClose = ({
  asChild,
  children,
  className,
  command = 'close',
  dialogId,
  ...props
}: DialogCloseProps) => {
  const context = useOptionalDialogContext();
  const commandFor = dialogId ?? context?.id;

  const fallback = useCallback(() => {
    if (commandFor) {
      closeDialog(commandFor, command);
    }
  }, [commandFor, command]);
  const onClick = useInvokerFallbackClick(fallback, props.onClick);

  if (!commandFor) {
    throw new Error('Dialog.Close requires a dialogId when used outside Dialog.Root');
  }

  const Component = asChild && isValidElement(children) ? Slot : 'button';
  const combinedClassName = cx(!asChild && styles.dialogClose, className);

  return (
    <Component
      aria-label={props['aria-label'] ?? (children ? undefined : 'close')}
      {...props}
      className={combinedClassName}
      command={command}
      commandfor={commandFor}
      onClick={onClick}
      type="button"
    >
      {children ?? <XIcon />}
    </Component>
  );
};

DialogClose.displayName = 'DialogClose';
