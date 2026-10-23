import { Slot } from '@radix-ui/react-slot';
import type { Prettify } from '@utils/types';
import { useInvokerFallbackClick } from '@utils/useInvokerFallbackClick';
import type React from 'react';
import { isValidElement, useCallback } from 'react';
import { useOptionalDialogContext } from './dialogContext';
import { showDialogModal } from './dialogInvokerFallback';

export type DialogTriggerProps = Prettify<
  Omit<React.ComponentPropsWithoutRef<'button'>, 'command' | 'commandfor' | 'type'> & {
    asChild?: boolean;
    dialogId?: string;
    ref?: React.Ref<HTMLButtonElement>;
  }
>;

export const DialogTrigger = ({ asChild, children, dialogId, ...props }: DialogTriggerProps) => {
  const context = useOptionalDialogContext();
  const commandFor = dialogId ?? context?.id;

  const fallback = useCallback(() => {
    if (commandFor) {
      showDialogModal(commandFor);
    }
  }, [commandFor]);
  const onClick = useInvokerFallbackClick(fallback, props.onClick);

  if (!commandFor) {
    throw new Error('Dialog.Trigger requires a dialogId when used outside Dialog.Root');
  }

  const Component = asChild && isValidElement(children) ? Slot : 'button';

  return (
    <Component
      {...props}
      command="show-modal"
      commandfor={commandFor}
      onClick={onClick}
      type="button"
    >
      {children}
    </Component>
  );
};

DialogTrigger.displayName = 'DialogTrigger';
