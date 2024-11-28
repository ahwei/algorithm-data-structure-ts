export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val; // 節點值
    this.left = left === undefined ? null : left; // 左子節點引用
    this.right = right === undefined ? null : right; // 右子節點引用
  }
}
