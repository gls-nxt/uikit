import { render } from '@testing-library/react';

import { Spinner, type SpinnerProps } from './spinner';

import styles from './spinner.module.css';

const setup = (props?: SpinnerProps) => {
  return render(<Spinner {...props} />);
};

describe('Spinner', () => {
  it('sets correct size classNames', () => {
    const { rerender, getByTestId } = setup({ size: 'xl', testId: 'spinner' });

    const element = getByTestId('spinner');
    expect(element).toHaveClass(styles['spinner--xl']);

    rerender(<Spinner size="lg" testId="spinner" />);
    expect(element).toHaveClass(styles['spinner--lg']);

    rerender(<Spinner size="md" testId="spinner" />);
    expect(element).toHaveClass(styles['spinner--md']);

    rerender(<Spinner size="sm" testId="spinner" />);
    expect(element).toHaveClass(styles['spinner--sm']);

    rerender(<Spinner size="xs" testId="spinner" />);
    expect(element).toHaveClass(styles['spinner--xs']);
  });

  it('sets correct color classNames', () => {
    const { rerender, getByTestId } = setup({ color: 'primary', testId: 'spinner' });

    const element = getByTestId('spinner');
    expect(element).toHaveClass(styles['spinner--primary']);

    rerender(<Spinner color="success" testId="spinner" />);
    expect(element).toHaveClass(styles['spinner--success']);

    rerender(<Spinner color="warning" testId="spinner" />);
    expect(element).toHaveClass(styles['spinner--warning']);

    rerender(<Spinner color="muted" testId="spinner" />);
    expect(element).toHaveClass(styles['spinner--muted']);

    rerender(<Spinner color="light" testId="spinner" />);
    expect(element).toHaveClass(styles['spinner--light']);

    rerender(<Spinner color="inverted" testId="spinner" />);
    expect(element).toHaveClass(styles['spinner--inverted']);
  });

  it('passes custom className', () => {
    const { getByTestId } = setup({ className: 'customClassName', testId: 'spinner' });

    expect(getByTestId('spinner')).toHaveClass('customClassName');
  });

  it('passes svg attributes', () => {
    const { getByTestId } = setup({ testId: 'spinner', width: 500 });

    expect(getByTestId('spinner')).toHaveAttribute('width', '500');
  });
});
