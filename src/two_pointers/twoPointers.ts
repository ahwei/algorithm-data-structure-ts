/**
 * 1. 容器最大儲水量
 * LeetCode 11. Container With Most Water
 * https://leetcode.com/problems/container-with-most-water/
 *
 * 給定一個數組 height，每個元素代表牆的高度，找出兩個牆能夠圍成的最大容積
 * Time: O(n), Space: O(1)
 */
export function maxArea(height: number[]): number {
  let maxWater = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * h);

    // 移動較矮的那端，因為較矮的限制了容水量
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
}

/**
 * 2. 移除重複元素
 * LeetCode 26. Remove Duplicates from Sorted Array
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 *
 * 給定排序數組，原地刪除重複元素，返回新長度
 * Time: O(n), Space: O(1)
 */
export function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;

  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}

/**
 * 3. 驗證回文字串
 * LeetCode 125. Valid Palindrome
 * https://leetcode.com/problems/valid-palindrome/
 *
 * 判斷字串是否為回文，只考慮字母和數字，忽略大小寫
 * Time: O(n), Space: O(1)
 */
export function isPalindrome(s: string): boolean {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

/**
 * 4. 排序數組的平方
 * LeetCode 977. Squares of a Sorted Array
 * https://leetcode.com/problems/squares-of-a-sorted-array/
 *
 * 給定非遞減順序數組，返回每個數字的平方組成的新數組（有序）
 * Time: O(n), Space: O(n)
 */
export function sortedSquares(nums: number[]): number[] {
  const result = new Array(nums.length);
  let left = 0;
  let right = nums.length - 1;
  let pos = nums.length - 1;

  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    if (leftSquare > rightSquare) {
      result[pos] = leftSquare;
      left++;
    } else {
      result[pos] = rightSquare;
      right--;
    }
    pos--;
  }
  return result;
}

/**
 * 5. 最接近的三數之和
 * LeetCode 16. 3Sum Closest
 * https://leetcode.com/problems/3sum-closest/
 *
 * 找出三個數的和最接近目標值的結果
 * Time: O(n^2), Space: O(1)
 */
export function threeSumClosest(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  let closest = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }

      if (sum < target) {
        left++;
      } else if (sum > target) {
        right--;
      } else {
        return sum; // 找到完全相等的情況
      }
    }
  }
  return closest;
}
