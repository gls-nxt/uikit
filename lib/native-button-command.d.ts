import 'react';

declare module 'react' {
  /** biome-ignore lint/style/useConsistentTypeDefinitions: React HTML attributes must be augmented via interface merging. */
  interface ButtonHTMLAttributes<T> {
    command?: 'show-modal' | 'close' | 'request-close' | `--${string}`;
    commandfor?: string;
  }
}
