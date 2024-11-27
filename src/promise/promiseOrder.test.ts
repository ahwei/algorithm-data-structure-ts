import { describe, expect, it } from "vitest";
import {
  promiseOrder1,
  promiseOrder2,
  promiseOrder3,
  promiseOrder4,
  promiseOrder5,
} from "./promiseOrder";

describe("promiseOrder", () => {
  it("should output numbers in correct order", async () => {
    const result = promiseOrder1();

    // 同步程式碼會先執行：1, 2, 3, 4, 7
    expect(result).toEqual([1, 2, 3, 4, 7]);

    // 等待微任務（Promise）執行
    await Promise.resolve();
    await Promise.resolve();

    // Promise.then 會在第一輪事件循環結束時執行：5, 6
    expect(result).toEqual([1, 2, 3, 4, 7, 5, 6]);

    // 等待宏任務（setTimeout）執行
    await new Promise((resolve) => setTimeout(resolve, 15));

    // setTimeout 會在最後執行：9, 8
    expect(result).toEqual([1, 2, 3, 4, 7, 5, 6, 9, 8]);
  });

  it("should handle simple promise chain (promiseOrder2)", async () => {
    const result = promiseOrder2();
    expect(result).toEqual([1, 4]);
    await Promise.resolve();
    await Promise.resolve();
    expect(result).toEqual([1, 4, 2, 3]);
  });

  it("should handle promise rejection (promiseOrder3)", async () => {
    const result = promiseOrder3();
    expect(result).toEqual([1, 4]);
    await Promise.resolve();
    await Promise.resolve();
    expect(result).toEqual([1, 4, 2, 3]);
  });

  it("should handle promise error and catch (promiseOrder4)", async () => {
    const result = promiseOrder4();
    expect(result).toEqual([1, 5]);
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve(); // 增加一個等待，確保 catch 後的 then 也執行完成
    expect(result).toEqual([1, 5, 2, 3, 4]);
  });

  it("should handle promise with setTimeout (promiseOrder5)", async () => {
    const result = promiseOrder5();
    expect(result).toEqual([1, 4]);
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(result).toEqual([1, 4, 2, 3]);
  });
});
