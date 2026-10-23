import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { dialogVariants } from './dialog.variants';
import { useDialogContext } from './dialogContext';

export type DialogContentProps = Prettify<
  Omit<React.ComponentPropsWithoutRef<'dialog'>, 'children' | 'id' | 'open' | 'title'> & {
    /**
     * The id of the element that labels the dialog. Must be an element id, not text.
     */
    'aria-labelledby': string;
    children: ReactNode;
    ref?: React.Ref<HTMLDialogElement>;
    size?: 'sm' | 'md' | 'lg' | 'xl';
  }
>;

export const DialogContent = ({
  children,
  className,
  ref,
  size = 'md',
  ...props
}: DialogContentProps) => {
  const { id, onOpenChange, setPortalContainer } = useDialogContext('Dialog.Content');
  const combinedClassName = cx(dialogVariants({ size }), className);

  const handleToggle = (event: React.ToggleEvent<HTMLDialogElement>) => {
    props.onToggle?.(event);
    onOpenChange?.(event.currentTarget.open);
  };

  const setDialogRef = useCallback(
    (node: HTMLDialogElement | null) => {
      setPortalContainer(node);

      if (typeof ref === 'function') {
        ref(node);
        return;
      }

      if (ref) {
        ref.current = node;
      }
    },
    [ref, setPortalContainer],
  );

  return (
    <dialog
      {...props}
      className={combinedClassName}
      id={id}
      onToggle={onOpenChange || props.onToggle ? handleToggle : undefined}
      ref={setDialogRef}
    >
      {children}
    </dialog>
  );
};

DialogContent.displayName = 'DialogContent';
