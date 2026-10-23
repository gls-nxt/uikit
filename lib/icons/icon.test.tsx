import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { Icon } from './icon';

import styles from './icon.module.css';

const testSvg = (
  <svg aria-hidden="true">
    <path d="M1 1h1" />
  </svg>
);

describe('Base Icon Component', () => {
  it('renders SVG children with base icon class', () => {
    const { container } = render(<Icon>{testSvg}</Icon>);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass(styles.icon);
  });

  it('merges custom className with variant classes', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <Icon className={customClass} color="primary" size="lg">
        {testSvg}
      </Icon>,
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveClass(customClass);
    expect(svgElement).toHaveClass(styles['icon--lg']);
    expect(svgElement).toHaveClass(styles['icon--primary']);
  });

  it('forwards additional SVG props to the element', () => {
    const { container } = render(
      <Icon data-testid="test-svg" fill="currentColor" height={24} width={24}>
        {testSvg}
      </Icon>,
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveStyle({
      height: '24px',
      width: '24px',
    });
    expect(svgElement).toHaveAttribute('fill', 'currentColor');
    expect(svgElement).toHaveAttribute('data-testid', 'test-svg');
  });

  it('forwards ref to SVG element', () => {
    const refValue = { current: null };
    render(<Icon ref={refValue}>{testSvg}</Icon>);
    expect(refValue.current).toBeInstanceOf(SVGSVGElement);
  });

  it('applies size variant class', () => {
    const { container } = render(<Icon size="xl">{testSvg}</Icon>);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveClass(styles['icon--xl']);
  });

  it('applies color variant class', () => {
    const { container } = render(<Icon color="error">{testSvg}</Icon>);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveClass(styles['icon--error']);
  });

  it('is accessible', async () => {
    const { container } = render(<Icon>{testSvg}</Icon>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
