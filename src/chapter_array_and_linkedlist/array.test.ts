import { describe, expect, it } from "vitest";
import { randomAccess } from "./array";

describe("Array Algorithms", () => {
  it("should return a number from the array", () => {
    const nums = [1, 2, 3, 4, 5];
    const result = randomAccess(nums);
    expect(nums).toContain(result);
  });

  it("should handle an array with one element", () => {
    const nums = [42];
    const result = randomAccess(nums);
    expect(result).toBe(42);
  });

  it("should handle an empty array", () => {
    const nums: number[] = [];
    const result = randomAccess(nums);
    expect(result).toBeUndefined();
  });
});
