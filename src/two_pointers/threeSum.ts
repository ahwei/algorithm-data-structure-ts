/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 *
 * Time Complexity: O(n^2)
 * - O(nlogn) for sorting
 * - O(n^2) for two pointers traversal
 * - Overall time complexity is O(n^2)
 *
 * Space Complexity: O(1)
 * - Only constant extra space is used excluding the output array
 */

export function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate values
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Two pointers
    let low = i + 1;
    let high = nums.length - 1;
    const sum = 0 - nums[i];

    while (low < high) {
      if (nums[low] + nums[high] === sum) {
        result.push([nums[i], nums[low], nums[high]]);
        while (low < high && nums[low] === nums[low + 1]) low++;
        while (low < high && nums[high] === nums[high - 1]) high--;
        low++;
        high--;
      } else if (nums[low] + nums[high] < sum) {
        low++;
      } else {
        high--;
      }
    }
  }

  return result;
}
