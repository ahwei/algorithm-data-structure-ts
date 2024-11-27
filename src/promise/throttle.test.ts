import { describe, expect, it, vi } from "vitest";
import { throttle } from "./throttle";

describe("throttle", () => {
  it("應該在指定時間內只執行一次", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
