import { IconButton } from '@components/iconButton';
import { XIcon } from '@icons';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './informationBox.module.css';
import { type InformationBoxVariants, informationBoxVariants } from './informationBox.variants';

export type InformationBoxProps = Prettify<
  Omit<React.HTMLProps<HTMLDivElement>, 'title' | 'description' | 'prefix'> &
    InformationBoxVariants & {
      children?: React.ReactNode;
      className?: string;
      title?: React.ReactNode;
      'data-testid'?: string;
      description?: React.ReactNode;
      prefix?: React.ReactElement | string;
      onClose?: () => void;
      closeButton?: boolean;
      minWidth?: number;
      visible?: boolean;
      'aria-label'?: string;
    }
>;

export const InformationBox = ({
  children,
  className,
  'data-testid': dataTestId,
  description,
  title,
  visible = true,
  prefix,
  closeButton,
  onClose,
  fullWidth,
  color,
  minWidth,
  'aria-label': ariaLabel,
  ...props
}: InformationBoxProps) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [exitAnimation, setExitAnimation] = useState(false);

  const alignment = description ? 'start' : 'center';

  const combinedInfoBoxClassName = cx(
    informationBoxVariants({
      color,
      exiting: exitAnimation,
      fullWidth,
    }),
    className,
  );

  const handleAnimationEnd = useCallback(() => {
    setIsVisible(false);
    setExitAnimation(false);
    onClose?.();
  }, [onClose]);

  const handleClose = useCallback(() => {
    setExitAnimation(true);
  }, []);

  // The exit animation's animationend normally finishes the close. This is a fail-safe for
  // when no animation runs (e.g. a consumer sets animation: none), so the box still closes.
  useEffect(() => {
    if (!exitAnimation) {
      return;
    }
    const timer = setTimeout(handleAnimationEnd, 1000);
    return () => clearTimeout(timer);
  }, [exitAnimation, handleAnimationEnd]);

  const handleSectionAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    props.onAnimationEnd?.(event);
    if (exitAnimation && event.target === event.currentTarget) {
      handleAnimationEnd();
    }
  };

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-label={ariaLabel}
      className={combinedInfoBoxClassName}
      data-testid={dataTestId}
      style={
        {
          '--align-items': alignment,
          '--min-width': minWidth ? `${minWidth}px` : undefined,
        } as React.CSSProperties
      }
      {...props}
      onAnimationEnd={handleSectionAnimationEnd}
    >
      {prefix ? (
        <div aria-hidden={true} className={styles.informationBoxPrefix}>
          {prefix}
        </div>
      ) : null}

      <div className={styles.informationBoxContent}>
        {title ? <div className={styles.informationBoxTitle}>{title}</div> : null}
        {children}
        {description ? (
          <span className={styles.informationBoxDescription}>{description}</span>
        ) : null}
      </div>

      {closeButton ? (
        <IconButton
          className={styles.informationBoxClose}
          color="blurred"
          icon={<XIcon aria-hidden="true" size="lg" />}
          label="Close information box"
          onClick={handleClose}
          size="xs"
          type="button"
        />
      ) : null}
    </section>
  );
};

InformationBox.displayName = 'InformationBox';

export default InformationBox;
