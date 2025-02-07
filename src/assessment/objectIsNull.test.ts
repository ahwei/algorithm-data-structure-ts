import { describe, expect, it } from "vitest";
import { cleanEmptyData } from "./objectIsNull";

describe("cleanEmptyData", () => {
  it("Should clean original test case correctly", () => {
    const taskData = [
      { a: null, b: 1 },
      null,
      [2, undefined, 3],
      [null, [null], { a: null, b: [null] }],
      { a: 4, b: { a: null, b: null }, c: { a: null } },
    ];
    cleanEmptyData(taskData);
    expect(taskData).toEqual([{ b: 1 }, [2, 3], { a: 4 }]);
  });

  it("Should handle empty array", () => {
    const data: any[] = [];
    cleanEmptyData(data);
    expect(data).toEqual([]);
  });

  it("Should handle deeply nested objects", () => {
    const data = [
      {
        a: { b: { c: null, d: 1 }, e: null },
        f: { g: { h: {} } },
      },
    ];
    cleanEmptyData(data);
    expect(data).toEqual([{ a: { b: { d: 1 } } }]);
  });

  it("Should handle deeply nested arrays", () => {
    const data = [
      [[], [null], [undefined]],
      [1, [2, [3, null, 4], undefined], 5],
    ];
    cleanEmptyData(data);

    expect(data).toEqual([1, [2, [3, 4]], 5]);
  });

  it("Should handle mixed data types", () => {
    const data = [
      { arr: [null, 1, { a: null }], num: 42 },
      "string",
      null,
      { obj: {} },
      [undefined],
    ];
    cleanEmptyData(data);
    expect(data).toEqual([{ arr: [1], num: 42 }, "string"]);
  });

  it("Should handle array with only null/undefined values", () => {
    const data = [null, undefined, null, [null], { a: null }];
    cleanEmptyData(data);
    expect(data).toEqual([]);
  });

  it("Should preserve primitive values", () => {
    const data = [1, "string", true, 0, false];
    cleanEmptyData(data);

    expect(data).toEqual([1, "string", true, 0, false]);
  });
});
