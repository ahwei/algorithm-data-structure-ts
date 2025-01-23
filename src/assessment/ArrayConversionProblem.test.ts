/**
 * Array Conversion Problem
 *
 * Given an array `arr` of length `n`, two types of operations can be performed:
 * 1. Operation type 1: Shift the array cyclically left by 1 position.
 * 2. Operation type 2: Swap any two elements of the array.
 *
 * Important: Once an operation of type 2 is performed, operations of type 1 cannot be performed again.
 *
 * Goal: Find the minimum number of operations needed to convert the given array into [1, 2, 3, ..., n].
 *
 * Note: The input array is guaranteed to be a permutation of [1, 2, 3, ..., n].
 *
 * Example:
 * Input: arr = [5, 3, 2, 1, 4]
 * Process:
 * 1. Operation type 1: [3, 2, 1, 4, 5]
 * 2. Operation type 2: Swap first and third elements to get [1, 2, 3, 4, 5]
 * Output: 2
 */

import { describe, expect, test } from "vitest";

function countMinimumOperations(arr: number[]): number {
  const n = arr.length;
  let minOperations = Infinity;

  for (let shift = 0; shift < n; shift++) {
    // Perform left shift by `shift` positions
    const shiftedArr = [...arr.slice(shift), ...arr.slice(0, shift)];
    const visited = new Array(n).fill(false);

    let swapOperations = 0;
    for (let i = 0; i < n; i++) {
      if (visited[i] || shiftedArr[i] === i + 1) continue;

      let cycleSize = 0;
      let j = i;
      while (!visited[j]) {
        visited[j] = true;
        j = shiftedArr[j] - 1;
        cycleSize++;
      }

      if (cycleSize > 0) {
        swapOperations += cycleSize - 1;
      }
    }

    minOperations = Math.min(minOperations, shift + swapOperations);
  }

  return minOperations;
}

describe("ArrayConversionProblem", () => {
  test("should return minimum operations needed", () => {
    const arr1 = [5, 3, 2, 1, 4];
    expect(countMinimumOperations(arr1)).toBe(2);

    const arr2 = [1, 2, 3, 4];
    expect(countMinimumOperations(arr2)).toBe(0);

    const arr3 = [1, 7, 6, 5, 4, 3, 2];
    expect(countMinimumOperations(arr3)).toBe(3);

    const arr4 = [2, 1, 5, 3, 4];
    expect(countMinimumOperations(arr4)).toBe(2);

    const arr5 = [8, 7, 6, 5, 4, 3, 2, 1];
    expect(countMinimumOperations(arr5)).toBe(4);
  });
});
