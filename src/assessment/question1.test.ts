import { describe, expect, it } from "vitest";
import { bubbleSort, findSecondLargest } from "./question1"; // 根據實際路徑修改

describe("bubbleSort", () => {
  it("should sort the array [5, 1, 3, 2, 4] to [1, 2, 3, 4, 5]", () => {
    const result = bubbleSort([5, 1, 3, 2, 4]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("findSecondLargest", () => {
  it("should return 2 for the array [3, 3, 2, 1]", () => {
    expect(findSecondLargest([3, 3, 2, 1])).toBe(2);
  });

  it("should return 3 for the array [3, 3, 4, 2, 1]", () => {
    expect(findSecondLargest([3, 3, 4, 2, 1])).toBe(3);
  });
});
