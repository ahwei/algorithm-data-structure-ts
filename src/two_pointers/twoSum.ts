/**
 * 時間複雜度: O(n) - 只需遍歷陣列一次
 * 空間複雜度: O(n) - 使用一個 Map 來儲存已遍歷過的數字
 */
export function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i);
  }

  return [];
}

/**
 * 時間複雜度: O(n²) - 使用巢狀迴圈遍歷
 * 空間複雜度: O(1) - 只使用固定的變數空間
 */
export function twoSumSlow(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}
