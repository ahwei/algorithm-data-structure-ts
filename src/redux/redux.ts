type Reducer<S = any, A = any> = (state: S, action: A) => S;
type Listener = () => void;

export function createStore<S, A>(reducer: Reducer<S, A>, initialState: S) {
  let currentState = initialState;
  let listeners: Listener[] = [];

  return {
    getState: () => currentState,

    dispatch: (action: A) => {
      currentState = reducer(currentState, action);
      listeners.forEach((listener) => listener());
      return action;
    },

    subscribe: (listener: Listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
}
