import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import InformationBox, { type InformationBoxProps } from './informationBox';

import styles from './informationBox.module.css';

// Helper function to render the component with default props
const renderInformationBox = (props?: Partial<InformationBoxProps>) => {
  return render(<InformationBox data-testid="information-box" {...props} />);
};

const closeButtonLabel = 'Close information box';

describe('InformationBox Component', () => {
  it('renders the information box with default props correctly', () => {
    renderInformationBox();
    expect(screen.getByTestId('information-box')).toBeInTheDocument();
  });

  it('renders information box title and description correctly', () => {
    renderInformationBox({
      description: 'Information Box Description',
      title: 'Information Box Title',
    });

    expect(screen.getByText('Information Box Title')).toBeInTheDocument();
    expect(screen.getByText('Information Box Description')).toBeInTheDocument();
  });

  it('renders informationBox with custom children correctly', () => {
    renderInformationBox({
      children: <div>Custom Children</div>,
    });
    expect(screen.getByText('Custom Children')).toBeInTheDocument();
  });

  it('renders close button and closes the information box correctly', () => {
    renderInformationBox({
      closeButton: true,
    });
    vi.useFakeTimers({ shouldAdvanceTime: true });
    expect(screen.getByRole('button', { name: closeButtonLabel })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: closeButtonLabel }));
    // since we are using setTimeout for the exit animation, we need to advance the timer
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.queryByTestId('information-box')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders with custom className', () => {
    const customClassName = 'custom-infobox';
    renderInformationBox({ className: customClassName });
    expect(screen.getByTestId('information-box')).toHaveClass(customClassName);
  });

  it('renders the informationBoxPrefix with props correctly', () => {
    renderInformationBox({
      prefix: <span data-testid="prefix">test</span>,
    });
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
  });

  it('visibility props works as expected', () => {
    renderInformationBox({ visible: false });
    expect(screen.queryByTestId('information-box')).not.toBeInTheDocument();
  });

  it('runs onClose when close button is clicked', () => {
    const onClose = vi.fn();
    vi.useFakeTimers({ shouldAdvanceTime: true });
    renderInformationBox({ closeButton: true, onClose });
    fireEvent.click(screen.getByRole('button', { name: closeButtonLabel }));
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(onClose).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('renders fullWidth informationBox correctly', () => {
    renderInformationBox({ fullWidth: true });
    expect(screen.getByTestId('information-box')).toHaveClass(styles['informationBox--fullWidth']);
  });

  it('renders the colors correctly', () => {
    renderInformationBox({ color: 'destructive' });
    expect(screen.getByTestId('information-box')).toHaveClass(
      styles['informationBox--destructive'],
    );
  });

  it('is accessible with no violations', async () => {
    const { container } = renderInformationBox({ children: 'test' });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
