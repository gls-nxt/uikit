import type { ToastProps } from '@components/toast';

import { dispatch } from './state';

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export function useToast() {
  return {
    dismiss: (toastId?: string) => dispatch({ toastId, type: 'DISMISS_TOAST' }),
    toast,
  };
}

export type Toast = Omit<ToastProps, 'id'>;

export function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToastProps) =>
    dispatch({
      toast: { ...props, id },
      type: 'UPDATE_TOAST',
    });

  const dismiss = () => dispatch({ toastId: id, type: 'DISMISS_TOAST' });

  dispatch({
    toast: {
      ...props,
      id,
      onOpenChange: (open) => {
        if (!open) {
          dismiss();
        }
      },
      open: true,
      variant: props.variant ? props.variant : 'default',
    },
    type: 'ADD_TOAST',
  });

  return {
    dismiss,
    id,
    update,
  };
}

function promise<T>(
  promise: Promise<T> | (() => Promise<T>),
  {
    pending,
    success,
    error,
  }: {
    pending: Toast;
    success: Toast | ((result: T) => Toast);
    error: Toast | ((error: T) => Toast);
  },
) {
  // it checks if the promise is of type promise or a function that returns a promise
  const p = promise instanceof Promise ? promise : promise();

  const pendingToast = toast({ ...pending, open: true, promise: p, variant: 'pending' });
  const id = pendingToast.id;

  const updateToast = async (
    result: T,
    toastType: 'success' | 'error',
    toastData: Toast | ((result: T) => Toast),
  ) => {
    const toastContent = typeof toastData === 'function' ? toastData(result) : toastData;

    pendingToast.update({
      ...toastContent,
      id,
      onOpenChange: (open) => {
        if (!open) {
          dispatch({ toastId: id, type: 'DISMISS_TOAST' });
        }
      },
      open: true,
      variant: toastType,
    });
  };

  p.then(async (result) => {
    await updateToast(result, 'success', success);
    return result;
  }).catch(async (err) => {
    await updateToast(err, 'error', error);
    throw err;
  });

  return {
    ...pendingToast,
    promise: p,
  };
}

// Extend the toast object with the promise method
toast.promise = promise;
