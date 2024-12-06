import { describe, expect, it } from "vitest";
import {
  isPalindrome,
  maxArea,
  removeDuplicates,
  sortedSquares,
  threeSumClosest,
} from "./twoPointers";

describe("maxArea", () => {
  it("應該返回最大容積", () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });

  it("應該處理空陣列", () => {
    expect(maxArea([])).toBe(0);
  });
});

describe("removeDuplicates", () => {
  it("應該移除排序陣列中的重複元素", () => {
    const nums = [1, 1, 2];
    expect(removeDuplicates(nums)).toBe(2);
    expect(nums.slice(0, 2)).toEqual([1, 2]);
  });

  it("應該處理全部相同的數字", () => {
    const nums = [1, 1, 1];
    expect(removeDuplicates(nums)).toBe(1);
    expect(nums.slice(0, 1)).toEqual([1]);
  });
});

describe("isPalindrome", () => {
  it("應該驗證基本回文", () => {
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  it("應該處理非回文", () => {
    expect(isPalindrome("race a car")).toBe(false);
  });

  it("應該處理空字串", () => {
    expect(isPalindrome("")).toBe(true);
  });

  it("應該忽略大小寫和非字母數字字符", () => {
    expect(isPalindrome("Race, e car")).toBe(true);
  });
});

describe("sortedSquares", () => {
  it("應該正確處理包含負數的排序陣列", () => {
    expect(sortedSquares([-4, -1, 0, 3, 10])).toEqual([0, 1, 9, 16, 100]);
  });

  it("應該處理全是負數的陣列", () => {
    expect(sortedSquares([-4, -3, -2])).toEqual([4, 9, 16]);
  });

  it("應該處理單一元素陣列", () => {
    expect(sortedSquares([5])).toEqual([25]);
  });
});

describe("threeSumClosest", () => {
  it("應該找到最接近目標值的三數之和", () => {
    expect(threeSumClosest([-1, 2, 1, -4], 1)).toBe(2);
  });

  it("應該處理剛好等於目標值的情況", () => {
    expect(threeSumClosest([0, 0, 0], 0)).toBe(0);
  });

  it("應該處理較大的數組", () => {
    expect(threeSumClosest([1, 1, 1, 0], 100)).toBe(3);
  });
});
