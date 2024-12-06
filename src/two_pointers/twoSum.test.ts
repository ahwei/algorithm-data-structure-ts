import { describe, expect, it } from "vitest";
import { twoSum } from "./twoSum";

describe("twoSum", () => {
  it("should return [0,1] when input [2,7,11,15] and target 9", () => {
    const result = twoSum([2, 7, 11, 15], 9);
    expect(result).toEqual([0, 1]);
  });
  it("should return [1,2] when input [3,2,4] and target 6", () => {
    const result = twoSum([3, 2, 4], 6);
    expect(result).toEqual([1, 2]);
  });
  it("should return [0,1] when input [3,3] and target 6", () => {
    const result = twoSum([3, 3], 6);
    expect(result).toEqual([0, 1]);
  });
});
