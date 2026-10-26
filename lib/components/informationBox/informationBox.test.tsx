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

// jsdom has no AnimationEvent, so React listens for the prefixed event name instead.
const fireAnimationEnd = (element: Element) =>
  fireEvent(element, new Event('webkitAnimationEnd', { bubbles: true }));

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

  it('renders close button and closes the information box when the exit animation ends', () => {
    renderInformationBox({
      closeButton: true,
    });
    expect(screen.getByRole('button', { name: closeButtonLabel })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: closeButtonLabel }));

    const box = screen.getByTestId('information-box');
    expect(box).toHaveClass(styles['informationBox--exiting']);
    fireAnimationEnd(box);

    expect(screen.queryByTestId('information-box')).not.toBeInTheDocument();
  });

  it('ignores animations ending on its children', () => {
    renderInformationBox({ children: <span data-testid="child" />, closeButton: true });
    fireEvent.click(screen.getByRole('button', { name: closeButtonLabel }));

    fireAnimationEnd(screen.getByTestId('child'));

    expect(screen.getByTestId('information-box')).toBeInTheDocument();
  });

  it('still closes when no exit animation runs', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    renderInformationBox({ closeButton: true });
    fireEvent.click(screen.getByRole('button', { name: closeButtonLabel }));

    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(screen.getByTestId('information-box')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
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

  it('runs onClose once when close button is clicked', () => {
    const onAnimationEnd = vi.fn();
    const onClose = vi.fn();
    vi.useFakeTimers({ shouldAdvanceTime: true });
    renderInformationBox({ closeButton: true, onAnimationEnd, onClose });
    fireEvent.click(screen.getByRole('button', { name: closeButtonLabel }));
    fireAnimationEnd(screen.getByTestId('information-box'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onAnimationEnd).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
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
