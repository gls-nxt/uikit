import Typography from '@components/typography';
import type { TypographyVariants } from '@components/typography/typography.variants';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';
import styles from './badge.module.css';
import { type BadgeVariants, badgeVariants } from './badge.variants';

export type BadgeProps = Prettify<
  Omit<React.HTMLProps<HTMLDivElement>, 'size'> &
    BadgeVariants & {
      [key: `data-${string}`]: string;
      willReceiveUpdates?: boolean;
    }
>;

const LABEL_SIZE_MAP: Record<string, number> = {
  lg: 3,
  md: 3,
  sm: 4,
  xs: 5,
};

export const Badge = ({
  children,
  className,
  color,
  size,
  willReceiveUpdates = false,
  ...props
}: BadgeProps) => {
  const combinedBadgeClassName = cx(badgeVariants({ color, size }), className);

  const labelSize = LABEL_SIZE_MAP[size ?? 'md'] ?? 3;

  return (
    <div
      // If the badge will not receive content updates, we don't need to add
      // `role="status"` which is used for accessibility purposes
      {...(willReceiveUpdates ? { role: 'status' } : {})}
      className={combinedBadgeClassName}
      {...props}
    >
      <Typography
        className={styles.badgeContent}
        size={labelSize as TypographyVariants['size']}
        variant="label"
      >
        {children}
      </Typography>
    </div>
  );
};

Badge.displayName = 'Badge';

export default Badge;
