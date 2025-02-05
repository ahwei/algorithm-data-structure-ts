import { describe, expect, it } from "vitest";
import { cleanEmptyData } from "./objectIsNull";

describe("bubbleSort", () => {
  const taskData = [
    { a: null, b: 1 },
    null,
    [2, undefined, 3],
    [null, [null], { a: null, b: [null] }],
    { a: 4, b: { a: null, b: null }, c: { a: null } },
  ];
  it("Should ", () => {
    cleanEmptyData(taskData);

    expect(taskData).toEqual([{ b: 1 }, [2, 3], { a: 4 }]);
  });
});
