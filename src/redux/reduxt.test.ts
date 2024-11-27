import { describe, expect, it, vi } from "vitest";
import { createStore } from "./redux";
describe("Redux 測試", () => {
  // 定義測試用的 reducer 和初始狀態
  type State = { count: number };
  type Action = { type: "INCREMENT" | "DECREMENT" };

  const initialState: State = { count: 0 };
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "INCREMENT":
        return { count: state.count + 1 };
      case "DECREMENT":
        return { count: state.count - 1 };
      default:
        return state;
    }
  };

  it("初始狀態應該正確", () => {
    const store = createStore(reducer, initialState);
    expect(store.getState()).toEqual({ count: 0 });
  });

  it("dispatch 應該更新狀態", () => {
    const store = createStore(reducer, initialState);
    store.dispatch({ type: "INCREMENT" });
    expect(store.getState().count).toBe(1);
  });

  it("subscribe 應該在狀態改變時被觸發", () => {
    const store = createStore(reducer, initialState);
    const mockFn = vi.fn();

    store.subscribe(mockFn);
    store.dispatch({ type: "INCREMENT" });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("unsubscribe 應該正常運作", () => {
    const store = createStore(reducer, initialState);
    const mockFn = vi.fn();

    const unsubscribe = store.subscribe(mockFn);
    unsubscribe();
    store.dispatch({ type: "INCREMENT" });

    expect(mockFn).not.toHaveBeenCalled();
  });
});
