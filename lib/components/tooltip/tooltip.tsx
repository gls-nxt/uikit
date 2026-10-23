import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import { useState } from 'react';

import { useOptionalDialogContext } from '../dialog/dialogContext';
import {
  type TooltipVariants,
  tooltipArrowVariants,
  tooltipHeadingVariants,
  tooltipVariants,
} from './tooltip.variants';

const TooltipArrow = (
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

export type TooltipProps = Prettify<
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content> &
    TooltipVariants & {
      trigger?: React.ReactNode;
      open?: boolean;
      defaultOpen?: boolean;
      onOpenChange?: (open: boolean) => void;
      children: React.ReactNode;
      customWidth?: number;
      className?: string;
      'data-testid'?: string;
      delayDuration?: number;
      heading?: React.ReactNode;
      sideOffset?: number;
      arrowClassName?: string;
    }
>;

export const Tooltip = ({
  trigger,
  width,
  open,
  defaultOpen,
  onOpenChange,
  children,
  delayDuration = 150,
  heading,
  customWidth,
  className,
  'data-testid': dataTestId,
  sideOffset = 10,
  arrowClassName,
  ...props
}: TooltipProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const dialogContext = useOptionalDialogContext();
  const isOpen = open !== undefined ? open : internalOpen;
  const portalContainer = dialogContext?.portalContainer ?? undefined;
  const tooltipContentClassName = cx(className, tooltipVariants({ width }));
  const tooltipHeadingClassName = tooltipHeadingVariants();
  const tooltipArrowClassName = cx(arrowClassName, tooltipArrowVariants());

  const handleOpenChange = (newOpen: boolean) => {
    // In uncontrolled mode, update internal state
    if (open === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const handleTouchEnd = () => {
    const newOpen = !isOpen;
    if (open === undefined) {
      setInternalOpen(newOpen);
    }
    // Notify parent component
    onOpenChange?.(newOpen);
  };

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root onOpenChange={handleOpenChange} open={isOpen}>
        <RadixTooltip.Trigger asChild onTouchEnd={handleTouchEnd}>
          {trigger}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal container={portalContainer}>
          <RadixTooltip.Content
            className={tooltipContentClassName}
            data-testid={dataTestId}
            sideOffset={sideOffset}
            style={{ maxWidth: customWidth, textAlign: heading ? 'left' : 'center' }}
            {...props}
          >
            {heading ? <div className={tooltipHeadingClassName}>{heading}</div> : null}
            {children}
            <span className={tooltipArrowClassName}>{TooltipArrow}</span>
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
