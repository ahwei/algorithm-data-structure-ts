import { describe, expect, it } from "vitest";
import { threeSum } from "./threeSum";

describe("threeSum", () => {
  it("should return all possible triplets that sum to zero", () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
  });

  it("should handle duplicate numbers", () => {
    expect(threeSum([-2, 0, 0, 2, 2])).toEqual([[-2, 0, 2]]);
  });

  it("should handle all negative numbers", () => {
    expect(threeSum([-1, -2, -3, -4, -5])).toEqual([]);
  });

  it("should handle all positive numbers", () => {
    expect(threeSum([1, 2, 3, 4, 5])).toEqual([]);
  });

  it("should handle empty array", () => {
    expect(threeSum([])).toEqual([]);
  });

  it("should handle array with exactly three numbers", () => {
    expect(threeSum([-1, 0, 1])).toEqual([[-1, 0, 1]]);
  });

  it("should return empty array when no valid triplets exist", () => {
    expect(threeSum([1, 2, 3])).toEqual([]);
  });
});
