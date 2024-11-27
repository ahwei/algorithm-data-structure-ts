import { describe, expect, it } from "vitest";
import { all } from "./promise";

function createPromise(value: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, 100);
  });
}

describe("Promise test", () => {
  it("should resolve with correct value", () => {
    return expect(Promise.resolve("success")).resolves.toBe("success");
  });

  it("should handle setTimeout correctly", () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("timeout complete");
      }, 100);
    }).then((result) => {
      expect(result).toBe("timeout complete");
    });
  });

  it("should execute promises in correct order", async () => {
    const results: number[] = [];

    const promise1 = new Promise<void>((resolve) => {
      setTimeout(() => {
        results.push(1);
        resolve();
      }, 100);
    });

    const promise2 = new Promise<void>((resolve) => {
      setTimeout(() => {
        results.push(2);
        resolve();
      }, 50);
    });

    await Promise.all([promise1, promise2]);

    // 因為 promise2 的 timeout 較短，所以會先執行
    expect(results).toEqual([2, 1]);
  });
});

describe("Promise.all implementation", () => {
  it("should resolve with array of values", async () => {
    const values = await all([
      createPromise(1),
      createPromise(2),
      createPromise(3),
    ]);
    expect(values).toEqual([1, 2, 3]);
  });

  it("should handle empty array", async () => {
    const values = await all([]);
    expect(values).toEqual([]);
  });

  it("should reject if any promise rejects", async () => {
    const failedPromise = Promise.reject(new Error("Failed"));

    await expect(
      all([createPromise(1), failedPromise, createPromise(3)]),
    ).rejects.toThrow("Failed");
  });
});
