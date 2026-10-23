import { Portal } from '@radix-ui/react-portal';
import { cx } from 'class-variance-authority';

import { Alert } from '../alert/alert';
import type { AlertItem } from '../use-alert/alert-context';

import { alerterVariants } from './alerter.variants';

export type AlerterProps = {
  className?: string;
  'data-testid'?: string;
  alerts: AlertItem[];
  container?: HTMLElement;
};

export const Alerter = ({
  className,
  'data-testid': dataTestId,
  alerts,
  container,
  ...props
}: AlerterProps) => {
  return (
    <Portal asChild container={container}>
      <div
        className={cx(alerterVariants({ position: container ? 'static' : 'fixed' }), className)}
        data-testid={dataTestId}
        role="alert"
        {...props}
      >
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            message={alert.message}
            title={alert.title}
            variant={alert.variant}
          />
        ))}
      </div>
    </Portal>
  );
};

Alerter.displayName = 'Alerter';

export default Alerter;
