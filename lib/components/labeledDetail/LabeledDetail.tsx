import Typography from '@components/typography';
import type { ReactElement } from 'react';

import type { IconProps } from '../../icons/icon';

type IconComponentType = (props: Omit<IconProps, 'ref'>) => ReactElement | null;

import styles from './index.module.css';

type LabeledDetailBasics = {
  details?: string;
  label: string;
};
type LabeledDetailWithImage = LabeledDetailBasics & {
  iconImage: ReactElement<HTMLImageElement>;
  iconComponent?: never;
};
type LabeledDetailWithIcon = LabeledDetailBasics & {
  iconImage?: never;
  iconComponent: IconComponentType;
};
type LabeledDetailProps = LabeledDetailWithImage | LabeledDetailWithIcon;

export const LabeledDetail = ({
  details,
  iconImage,
  iconComponent: IconComponent,
  label,
}: LabeledDetailProps) => {
  if (!details) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        {iconImage}
        {IconComponent ? (
          <IconComponent aria-hidden="true" className={styles.icon} size="lg" />
        ) : null}
      </div>
      <dl className={styles.details}>
        <Typography as="dt" color="light" size={4} variant="label">
          {label}
        </Typography>
        <Typography as="dd" fontWeight="medium" size={2} variant="label">
          {details}
        </Typography>
      </dl>
    </div>
  );
};
