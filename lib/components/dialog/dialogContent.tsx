import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';
import type { ReactNode } from 'react';
import { useCallback, useRef } from 'react';
import { dialogVariants } from './dialog.variants';
import { useDialogContext } from './dialogContext';
import { closeDialog } from './dialogInvokerFallback';

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

  // closedby="any" light dismiss for browsers without it (Safari). A backdrop click
  // targets the dialog element itself, at a point outside its box. Like native light
  // dismiss, both the press and the release must land on the backdrop.
  const needsLightDismissFallback =
    props.closedby === 'any' &&
    typeof HTMLDialogElement !== 'undefined' &&
    !('closedBy' in HTMLDialogElement.prototype);
  const pressedOnBackdrop = useRef(false);

  const isOnBackdrop = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) {
      return false;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    return (
      event.clientY < rect.top ||
      event.clientY > rect.bottom ||
      event.clientX < rect.left ||
      event.clientX > rect.right
    );
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDialogElement>) => {
    props.onPointerDown?.(event);
    pressedOnBackdrop.current = isOnBackdrop(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    props.onClick?.(event);
    const pressed = pressedOnBackdrop.current;
    pressedOnBackdrop.current = false;
    if (!event.defaultPrevented && pressed && isOnBackdrop(event)) {
      closeDialog(id, 'request-close');
    }
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
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop clicks are pointer-only; the native Esc close request is the keyboard equivalent.
    <dialog
      {...props}
      className={combinedClassName}
      id={id}
      onClick={needsLightDismissFallback ? handleClick : props.onClick}
      onPointerDown={needsLightDismissFallback ? handlePointerDown : props.onPointerDown}
      onToggle={onOpenChange || props.onToggle ? handleToggle : undefined}
      ref={setDialogRef}
    >
      {children}
    </dialog>
  );
};

DialogContent.displayName = 'DialogContent';
