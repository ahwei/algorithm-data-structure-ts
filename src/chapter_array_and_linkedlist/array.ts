export function randomAccess(nums: number[]): number {
  const random_index = Math.floor(Math.random() * nums.length);

  const random_num = nums[random_index];
  return random_num;
}
