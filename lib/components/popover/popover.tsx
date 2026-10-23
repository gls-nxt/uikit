import * as RadixPopover from '@radix-ui/react-popover';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import { useCallback } from 'react';

import { useOptionalDialogContext } from '../dialog/dialogContext';
import {
  type PopoverVariants,
  popoverArrowVariants,
  popoverHeadingVariants,
  popoverVariants,
} from './popover.variants';

const PopoverArrow = (
  <svg
    aria-hidden="true"
    fill="none"
    height="11"
    viewBox="0 0 17 11"
    width="17"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.27396 10.0541C8.87385 10.5431 8.12615 10.5431 7.72604 10.0541L0.836285 1.63324C0.302069 0.980307 0.766617 0 1.61024 0L15.3898 0C16.2334 0 16.6979 0.980307 16.1637 1.63324L9.27396 10.0541Z"
      fill="currentColor"
    />
  </svg>
);

export type PopoverProps = Prettify<
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content> &
    PopoverVariants & {
      trigger?: React.ReactNode;
      open?: boolean;
      defaultOpen?: boolean;
      onOpenChange?: (open: boolean) => void;
      children: React.ReactNode;
      customWidth?: number;
      className?: string;
      'data-testid'?: string;
      heading?: React.ReactNode;
      sideOffset?: number;
      arrowClassName?: string;
    }
>;

export const Popover = ({
  trigger,
  width,
  open,
  defaultOpen,
  onOpenChange,
  children,
  heading,
  customWidth,
  className,
  style,
  'data-testid': dataTestId,
  sideOffset = 10,
  arrowClassName,
  side = 'top',
  ...props
}: PopoverProps) => {
  const dialogContext = useOptionalDialogContext();
  const portalContainer = dialogContext?.portalContainer ?? undefined;
  const popoverContentClassName = cx(className, popoverVariants({ width }));
  const popoverHeadingClassName = popoverHeadingVariants();
  const popoverArrowClassName = cx(arrowClassName, popoverArrowVariants());

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      onOpenChange?.(newOpen);
    },
    [onOpenChange],
  );

  return (
    <RadixPopover.Root defaultOpen={defaultOpen} onOpenChange={handleOpenChange} open={open}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal container={portalContainer}>
        <RadixPopover.Content
          className={popoverContentClassName}
          data-testid={dataTestId}
          side={side}
          sideOffset={sideOffset}
          style={{
            maxWidth: customWidth,
            textAlign: heading ? 'left' : 'center',
            ...style,
          }}
          {...props}
        >
          {heading ? <div className={popoverHeadingClassName}>{heading}</div> : null}
          {children}
          <span className={popoverArrowClassName}>{PopoverArrow}</span>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

Popover.displayName = 'Popover';

export default Popover;
