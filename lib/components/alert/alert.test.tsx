import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import Alert, { type AlertProps } from './alert';

import styles from './alert.module.css';

const renderAlert = (props?: Partial<AlertProps>) => {
  const defaultProps = {
    title: 'Test Alert',
    ...props,
  } as AlertProps;
  return render(<Alert {...defaultProps} />);
};

describe('Alert Component', () => {
  it('renders the alert with correct title', () => {
    renderAlert();
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
  });

  it('renders with message when provided', () => {
    renderAlert({ message: 'Test message' });
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with the compound slot API', () => {
    render(
      <Alert.Root data-testid="testAlert" variant="warning">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Slot Alert</Alert.Title>
          <Alert.Description>Slot message</Alert.Description>
        </Alert.Content>
      </Alert.Root>,
    );

    expect(screen.getByTestId('testAlert')).toHaveClass(styles['alert--warning']);
    expect(screen.getByText('Slot Alert')).toBeInTheDocument();
    expect(screen.getByText('Slot message')).toBeInTheDocument();
  });

  it('applies correct variant class', () => {
    const { container } = renderAlert({ variant: 'warning' });
    const alertElement = container.firstChild as HTMLElement;

    expect(alertElement).toHaveClass(styles['alert--warning']);
  });

  it('renders close button when showClose is true', () => {
    renderAlert({ closeLabel: 'Close', 'data-testid': 'testAlert', showClose: true });
    const closeButton = screen.getByTestId('testAlertClose');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Close');
  });

  it('renders both action and close button inside the action wrapper', () => {
    renderAlert({
      action: <button type="button">Undo</button>,
      closeLabel: 'Dismiss',
      'data-testid': 'testAlert',
      showClose: true,
    });

    const action = screen.getByRole('button', { name: 'Undo' });
    const closeButton = screen.getByTestId('testAlertClose');

    expect(action).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(action.parentElement).toHaveClass(styles.alertAction);
    expect(closeButton.parentElement).toHaveClass(styles.alertAction);
  });

  it('does not hardcode a default close label', () => {
    render(
      <Alert.Root>
        <Alert.Content>
          <Alert.Title>Slot Alert</Alert.Title>
        </Alert.Content>
        <Alert.Action>
          <Alert.Close aria-label="dismiss alert" data-testid="testAlertClose" />
        </Alert.Action>
      </Alert.Root>,
    );

    expect(screen.getByRole('button', { name: 'dismiss alert' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Close alert' })).not.toBeInTheDocument();
  });

  it('calls onClick from Alert.Close when using the compound slot API', () => {
    const onClick = vi.fn();

    render(
      <Alert.Root data-testid="testAlert">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Slot Alert</Alert.Title>
        </Alert.Content>
        <Alert.Action>
          <Alert.Close aria-label="close" data-testid="testAlertClose" onClick={onClick} />
        </Alert.Action>
      </Alert.Root>,
    );

    fireEvent.click(screen.getByTestId('testAlertClose'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    renderAlert({ closeLabel: 'close', 'data-testid': 'testAlert', onClose, showClose: true });

    const closeButton = screen.getByTestId('testAlertClose');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders custom action when provided', () => {
    const actionText = 'Custom Action';
    renderAlert({
      action: <button type="button">{actionText}</button>,
    });
    expect(screen.getByText(actionText)).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const customClassName = 'custom-class';
    const { container } = renderAlert({ className: customClassName });
    const alertElement = container.firstChild as HTMLElement;
    expect(alertElement).toHaveClass(customClassName);
  });

  it('renders with correct data-testid', () => {
    renderAlert({ 'data-testid': 'testAlert' });
    expect(screen.getByTestId('testAlert')).toBeInTheDocument();
  });

  it('renders all variants correctly', () => {
    const variants = ['info', 'warning', 'error'] as const;
    variants.forEach((variant) => {
      const { container, unmount } = renderAlert({ variant });
      const alertElement = container.firstChild as HTMLElement;
      expect(alertElement).toHaveClass(styles[`alert--${variant}`]);
      unmount();
    });
  });

  it('is accessible with no violations', async () => {
    const { container } = renderAlert();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders icon based on variant', () => {
    const { container } = renderAlert();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders different icons for each variant', () => {
    const variants = ['info', 'warning', 'error'] as const;
    variants.forEach((variant) => {
      const { container, unmount } = renderAlert({ variant });
      expect(container.querySelector('svg')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders children inside the content area', () => {
    renderAlert({
      children: (
        <ul>
          <li>First item</li>
          <li>Second item</li>
        </ul>
      ),
    });
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders children alongside title and message', () => {
    renderAlert({
      children: (
        <ul>
          <li>List item</li>
        </ul>
      ),
      message: 'Intro message',
    });
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByText('Intro message')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});
