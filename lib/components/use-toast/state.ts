import type { ToastProps } from '@components/toast';

const TOAST_REMOVE_DELAY = 1000;

type Action =
  | {
      type: 'ADD_TOAST';
      toast: ToastProps; // Ensure the toast type is ToastProps
    }
  | {
      type: 'UPDATE_TOAST';
      toast: Partial<ToastProps>; // Ensure the toast type is ToastProps
    }
  | {
      type: 'DISMISS_TOAST';
      toastId?: ToastProps['id'];
    }
  | {
      type: 'REMOVE_TOAST';
      toastId?: ToastProps['id'];
    };

export type State = {
  toasts: ToastProps[];
  maxVisibleToasts: number;
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      toastId: toastId,
      type: 'REMOVE_TOAST',
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, state.maxVisibleToasts),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

export const listeners: Array<(state: State) => void> = [];

export let memoryState: State = { maxVisibleToasts: 10, toasts: [] };

export function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
