import { describe, expect, it } from "vitest";
import { flat, flatSpaceLow } from "./flat";

describe("flat", () => {
  it("should flatten an array with one level", () => {
    const arr = [1, [2, 3], 4, [5]];
    expect(flat(arr)).toEqual([1, 2, 3, 4, 5]);
  });

  it("should flatten an array with multiple levels", () => {
    const arr = [1, [2, [3, [4, 5]]]];
    expect(flat(arr, Infinity)).toEqual([1, 2, 3, 4, 5]);
  });

  it("should flatten an array with multiple levels", () => {
    const arr = [1, [2, [3, [4, 5]]]];
    expect(flatSpaceLow(arr, Infinity)).toEqual([1, 2, 3, 4, 5]);
  });
});
