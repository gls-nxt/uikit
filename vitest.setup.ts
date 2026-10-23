import '@testing-library/jest-dom';

import '@testing-library/jest-dom/vitest';
import { configureAxe, toHaveNoViolations } from 'jest-axe';

// AXE accessibility testing
// <---------------------------------------------------
// declare module 'vitest' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//   export interface Assertion extends AxeMatchers {}
//   // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//   export interface AsymmetricMatchersContaining extends AxeMatchers {}
// }

expect.extend(toHaveNoViolations);

configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
  },
});
