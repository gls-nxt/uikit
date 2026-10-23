import { useEffect, useState } from 'react';

import { dispatch, listeners, memoryState, type State } from './state';

export function useToasterState(initialState?: Partial<State>) {
  const [state, setState] = useState<State>({ ...memoryState, ...initialState });

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    dismiss: (toastId: string) => dispatch({ toastId, type: 'DISMISS_TOAST' }),
    dismissAll: () => dispatch({ type: 'DISMISS_TOAST' }),
  };
}
