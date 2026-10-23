import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';
import { Children, cloneElement, isValidElement } from 'react';

import { type WrapperVariants, wrapperVariants } from './input.variants';
import { getInputSlot, type InputInjectedProps } from './inputSlots';

export type InputRootProps = Prettify<
  Omit<React.ComponentPropsWithoutRef<'div'>, 'id'> &
    WrapperVariants & {
      id: string;
      error?: boolean;
      labelled?: boolean;
      required?: boolean;
    }
>;

type SlottedElementProps = InputInjectedProps & {
  children?: React.ReactNode;
  id?: string;
};

type DescriptionIds = {
  errorMessageId?: string;
  helperTextId?: string;
};

const hasDescriptionContent = (children: React.ReactNode) =>
  children !== undefined && children !== null && children !== false && children !== '';

const getDescriptionId = (
  props: SlottedElementProps,
  baseId: string,
  suffix: 'error-message' | 'helper-text',
) => {
  if (!hasDescriptionContent(props.children)) {
    return undefined;
  }

  return props.id ?? `${baseId}-${suffix}`;
};

const getDescriptionIds = (children: React.ReactNode, baseId: string): DescriptionIds => {
  const descriptionIds: DescriptionIds = {};

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    const slot = getInputSlot(child);
    const props = child.props as SlottedElementProps;
    const childDescriptionIds = getDescriptionIds(props.children, baseId);

    if (childDescriptionIds.errorMessageId) {
      descriptionIds.errorMessageId = childDescriptionIds.errorMessageId;
    }

    if (childDescriptionIds.helperTextId) {
      descriptionIds.helperTextId = childDescriptionIds.helperTextId;
    }

    if (slot === 'errorMessage') {
      descriptionIds.errorMessageId = getDescriptionId(props, baseId, 'error-message');
    }

    if (slot === 'helperText') {
      descriptionIds.helperTextId = getDescriptionId(props, baseId, 'helper-text');
    }
  });

  return descriptionIds;
};

const getInjectedProps = (
  slot: ReturnType<typeof getInputSlot>,
  baseId: string,
  error: boolean,
  required: boolean | undefined,
  descriptionIds: DescriptionIds,
): InputInjectedProps => {
  switch (slot) {
    case 'control':
      return {
        __inputError: error,
        __inputErrorMessageId: descriptionIds.errorMessageId,
        __inputHelperTextId: descriptionIds.helperTextId,
        __inputId: baseId,
        __inputRequired: required,
      };
    case 'errorMessage':
      return { __inputErrorMessageId: descriptionIds.errorMessageId };
    case 'field':
      return { __inputError: error };
    case 'helperText':
      return { __inputHelperTextId: descriptionIds.helperTextId };
    case 'label':
      return { __inputId: baseId };
    default:
      return {};
  }
};

const hasInjectedProps = (props: InputInjectedProps) =>
  Object.values(props).some((value) => value !== undefined);

const renderSlottedChildren = (
  children: React.ReactNode,
  baseId: string,
  error: boolean,
  required: boolean | undefined,
  descriptionIds: DescriptionIds,
): React.ReactNode => {
  const renderedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    const slot = getInputSlot(child);
    const props = child.props as SlottedElementProps;
    const renderedChildren = renderSlottedChildren(
      props.children,
      baseId,
      error,
      required,
      descriptionIds,
    );
    const injectedProps = getInjectedProps(slot, baseId, error, required, descriptionIds);
    const shouldClone = hasInjectedProps(injectedProps) || renderedChildren !== props.children;

    if (!shouldClone) {
      return child;
    }

    return cloneElement(child as React.ReactElement<SlottedElementProps>, {
      ...injectedProps,
      children: renderedChildren,
    });
  });

  if (
    renderedChildren === undefined ||
    renderedChildren === null ||
    Children.count(children) !== 1
  ) {
    return renderedChildren;
  }

  return renderedChildren[0];
};

export const InputRoot = ({
  children,
  className,
  error = false,
  fullWidth,
  id,
  labelled,
  required,
  size,
  ...props
}: InputRootProps) => {
  const descriptionIds = getDescriptionIds(children, id);
  const slottedChildren = renderSlottedChildren(children, id, error, required, descriptionIds);

  return (
    <div
      {...props}
      className={cx(
        wrapperVariants({
          fullWidth,
          labelled,
          size,
        }),
        className,
      )}
    >
      {slottedChildren}
    </div>
  );
};

InputRoot.displayName = 'InputRoot';
