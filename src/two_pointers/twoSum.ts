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

/**
 * 時間複雜度: O(nlogn) - 主要來自排序過程
 * 空間複雜度: O(n) - 需要存儲索引陣列
 */
export function twoSumTwoPointers(nums: number[], target: number): number[] {
  // 創建包含原始索引的陣列
  const indexedNums = nums.map((num, index) => ({ num, index }));

  // 根據數字大小排序
  indexedNums.sort((a, b) => a.num - b.num);

  let left = 0;
  let right = indexedNums.length - 1;

  while (left < right) {
    const sum = indexedNums[left].num + indexedNums[right].num;

    if (sum === target) {
      return [indexedNums[left].index, indexedNums[right].index];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}
