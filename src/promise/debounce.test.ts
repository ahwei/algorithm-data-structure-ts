import { describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  it("應該在最後一次調用後延遲指定時間執行", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced();
    debounced();
    debounced();

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
