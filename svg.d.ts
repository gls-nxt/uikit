declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react';

  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}
