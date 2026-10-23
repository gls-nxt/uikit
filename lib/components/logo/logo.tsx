import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import styles from './logo.module.css';
import logoVariants, { type LogoVariants } from './logo.variants';

export type LogoProps = Prettify<
  LogoVariants & {
    className?: string;
    allowDarkMode?: boolean;
  }
>;

export function Logo({ theme, allowDarkMode, className, ...props }: LogoProps) {
  const wrapperClassName = cx(logoVariants({ allowDarkMode, theme }), className);

  return (
    <svg
      aria-label="Logo"
      className={wrapperClassName}
      role="img"
      viewBox="0 0 91 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className={styles.dot}
        d="M85.775 29.87c2.746 0 4.971-2.21 4.971-4.935 0-2.725-2.225-4.933-4.97-4.933-2.746 0-4.971 2.208-4.971 4.933 0 2.725 2.225 4.934 4.97 4.934Z"
      />
      <path
        className={styles.letters}
        d="M14.935 13.974v6.456h5.411c-.79 1.231-2.573 1.887-3.782 1.887-4.073 0-6.11-2.304-6.11-6.954 0-5.135 2.689-7.762 8.025-7.762 2.118 0 4.888.525 7.86 1.455V1.334c-.855-.363-2.158-.646-3.828-.93C20.801.121 19.293 0 17.99 0 12.694 0 8.5 1.415 5.363 4.245 2.226 7.075.638 10.875.638 15.687c0 4.407 1.222 7.884 3.666 10.432C6.747 28.706 10.047 30 14.2 30c4.172 0 8.005-2.149 9.24-4.878l-.027 4.392h6.035v-15.54H14.935ZM32.46 29.514V.484h9.37v21.47h10.223v7.56H32.46ZM55.471 28.787v-7.924c1.386.444 3.015.808 4.848 1.132 1.833.323 3.422.485 4.766.485 2.28 0 3.463-.566 3.463-1.577 0-.646-.367-.97-2.037-1.334l-3.259-.728c-5.58-1.253-8.187-4.043-8.187-8.773 0-3.114 1.1-5.58 3.26-7.399C60.48.889 63.494 0 67.282 0c2.607 0 6.6.525 9.043 1.132v7.56a48.153 48.153 0 0 0-4.602-.93c-1.833-.282-3.259-.404-4.317-.404-1.996 0-3.137.566-3.137 1.577 0 .606.53 1.011 1.63 1.294l3.787.89c5.54 1.293 8.106 4.123 8.106 8.934 0 3.074-1.141 5.499-3.381 7.278-2.24 1.779-5.336 2.668-9.287 2.668-3.748 0-7.536-.525-9.654-1.212Z"
      />
    </svg>
  );
}

export default Logo;
