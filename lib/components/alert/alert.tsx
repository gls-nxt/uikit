export { AlertAction, type AlertActionProps } from './alertAction';
export { AlertClose, type AlertCloseProps } from './alertClose';
export { AlertContent, type AlertContentProps } from './alertContent';
export { AlertDescription, type AlertDescriptionProps } from './alertDescription';
export { AlertIcon, type AlertIconProps } from './alertIcon';
export { AlertRoot, type AlertRootProps } from './alertRoot';
export { AlertTitle, type AlertTitleProps } from './alertTitle';

import type { Prettify } from '@utils/types';
import type { HTMLAttributes, ReactNode } from 'react';

import type { AlertVariants } from './alert.variants';
import { AlertAction } from './alertAction';
import { AlertClose } from './alertClose';
import { AlertContent } from './alertContent';
import { AlertDescription } from './alertDescription';
import { AlertIcon } from './alertIcon';
import { AlertRoot } from './alertRoot';
import { AlertTitle } from './alertTitle';

export type AlertProps = Prettify<
  HTMLAttributes<HTMLDivElement> &
    AlertVariants & {
      /**
       * @deprecated Use `Alert.Title` inside `Alert.Content` instead.
       */
      title: string;
      /**
       * @deprecated Use `Alert.Description` inside `Alert.Content` instead.
       */
      message?: string;
      /**
       * @deprecated Use `Alert.Action` instead.
       */
      action?: ReactNode;
      onClose?: () => void;
      className?: string;
      'data-testid'?: string;
    } & (
      | {
          showClose: true;
          closeLabel: string;
        }
      | {
          showClose?: false;
          closeLabel?: string;
        }
    )
>;

const AlertLegacy = ({
  variant = 'info',
  title,
  message,
  action,
  showClose,
  'data-testid': dataTestId,
  closeLabel,
  onClose,
  children,
  ...props
}: AlertProps) => {
  return (
    <AlertRoot data-testid={dataTestId} variant={variant} {...props}>
      <AlertIcon />

      <AlertContent>
        <AlertTitle>{title}</AlertTitle>
        {message ? <AlertDescription>{message}</AlertDescription> : null}
        {children}
      </AlertContent>

      {action || showClose ? (
        <AlertAction>
          {action}
          {showClose ? (
            <AlertClose
              aria-label={closeLabel}
              data-testid={dataTestId ? `${dataTestId}Close` : undefined}
              onClick={onClose}
            />
          ) : null}
        </AlertAction>
      ) : null}
    </AlertRoot>
  );
};

AlertLegacy.displayName = 'Alert';

export const Alert = Object.assign(AlertLegacy, {
  Action: AlertAction,
  Close: AlertClose,
  Content: AlertContent,
  Description: AlertDescription,
  Icon: AlertIcon,
  Root: AlertRoot,
  Title: AlertTitle,
});

export default Alert;
