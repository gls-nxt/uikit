import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, vi } from 'vitest';

import { Toaster } from './toaster';

vi.mock('../use-toast', () => ({
  useToasterState: vi
    .fn()
    .mockReturnValue({ toasts: [{ description: 'description', id: 'id', title: 'toast' }] }),
}));

describe('Toaster', () => {
  it('renders toasts', () => {
    const { getByText } = render(<Toaster />);

    getByText('toast');
  });

  it('renders viewport', () => {
    const { getByTestId } = render(<Toaster viewportProps={{ 'data-testid': 'toasterTestId' }} />);

    getByTestId('toasterTestId');
  });

  it('is accessible with no violations', async () => {
    const { container } = render(<Toaster />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
