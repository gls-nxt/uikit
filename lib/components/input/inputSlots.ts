export const INPUT_SLOT = Symbol.for('@gls-nxt/uikit/input-slot');

export type InputSlot = 'control' | 'errorMessage' | 'field' | 'helperText' | 'label';

export type InputSlotComponent = {
  [INPUT_SLOT]?: InputSlot;
};

export type InputInjectedProps = {
  __inputError?: boolean;
  __inputErrorMessageId?: string;
  __inputHelperTextId?: string;
  __inputId?: string;
  __inputRequired?: boolean;
};

export const markInputSlot = <TComponent extends object>(
  component: TComponent,
  slot: InputSlot,
) => {
  (component as InputSlotComponent)[INPUT_SLOT] = slot;
  return component;
};

export const getInputSlot = (element: React.ReactElement) => {
  if (typeof element.type === 'string') {
    return undefined;
  }

  return (element.type as InputSlotComponent)[INPUT_SLOT];
};
