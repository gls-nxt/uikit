import { ToastProvider, ToastViewport } from '@radix-ui/react-toast';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Toast, type ToastProps } from './toast';

function setup(props?: Partial<ToastProps>) {
  return render(
    <ToastProvider>
      <Toast description="description" id="toast" open={true} title="title" {...props} />
      <ToastViewport />
    </ToastProvider>,
  );
}

describe('Toast', () => {
  it('renders the toast with title and description', () => {
    const { getByText } = setup();

    getByText('title');
    getByText('description');
  });

  it('renders the toast with prefix', () => {
    const { getByText } = setup({ prefix: <span>prefix</span> });

    expect(getByText('prefix'));
  });

  it('renders the toast with action and call the action onClick', () => {
    const mockActionClick = vi.fn();

    const { getByText } = setup({
      action: {
        altText: 'altText',
        label: 'Action',
        onClick: mockActionClick,
      },
    });

    getByText('Action').click();
    expect(mockActionClick).toHaveBeenCalledTimes(1);
  });

  it('renders the toast with close button and call the onOpenChange onClick', () => {
    const onOpenChange = vi.fn();

    const { getByLabelText } = setup({ close: true, onOpenChange });

    getByLabelText('toast-close-button').click();
    expect(onOpenChange).toHaveBeenNthCalledWith(1, false);
  });

  it('applies data-testId correctly', () => {
    const { getByTestId } = setup({ 'data-testid': 'test-toast' });

    getByTestId('test-toast');
  });

  it('applies custom className', () => {
    const { getByTestId } = setup({ className: 'custom-class', 'data-testid': 'test-toast' });

    expect(getByTestId('test-toast')).toHaveClass('custom-class');
  });
});
