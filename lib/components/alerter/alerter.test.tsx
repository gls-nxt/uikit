import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AlertProvider } from '../use-alert';
import type { AlertItem } from '../use-alert/alert-context';

import { Alerter } from './alerter';

function setup(alerts: AlertItem[] = []) {
  return render(
    <AlertProvider>
      <Alerter alerts={alerts} />
    </AlertProvider>,
  );
}

describe('Alerter', () => {
  it('renders alerts with title and message', () => {
    const alerts: AlertItem[] = [
      {
        id: '1',
        message: 'Info message',
        title: 'Info Alert',
        variant: 'info',
      },
      {
        id: '2',
        message: 'Warning message',
        title: 'Warning Alert',
        variant: 'warning',
      },
    ];

    const { getByText } = setup(alerts);

    expect(getByText('Info Alert')).toBeInTheDocument();
    expect(getByText('Info message')).toBeInTheDocument();
    expect(getByText('Warning Alert')).toBeInTheDocument();
    expect(getByText('Warning message')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const alerts: AlertItem[] = [
      {
        id: '1',
        message: 'Test message',
        title: 'Test Alert',
        variant: 'info',
      },
    ];

    render(
      <AlertProvider>
        <Alerter alerts={alerts} className="custom-class" />
      </AlertProvider>,
    );

    const alerterElement = document.querySelector('.custom-class');
    expect(alerterElement).toHaveClass('custom-class');
  });

  it('applies data-testid', () => {
    render(
      <AlertProvider>
        <Alerter alerts={[]} data-testid="test-alerter" />
      </AlertProvider>,
    );

    expect(screen.getByTestId('test-alerter')).toBeInTheDocument();
  });
});
