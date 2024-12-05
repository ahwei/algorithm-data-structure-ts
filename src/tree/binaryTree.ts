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

export function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// 前序遍歷 (根->左->右)
export function preorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      result.push(current.val); // 訪問根節點
      stack.push(current);
      current = current.left; // 遍歷左子樹
    }

    current = stack.pop()!;
    current = current.right; // 遍歷右子樹
  }

  return result;
}

// 中序遍歷 (左->根->右)
export function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left; // 遍歷左子樹
    }

    current = stack.pop()!;
    result.push(current.val); // 訪問根節點
    current = current.right; // 遍歷右子樹
  }

  return result;
}

// 後序遍歷 (左->右->根)
export function postorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let current = root;
  let lastVisited: TreeNode | null = null;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left; // 遍歷左子樹
    }

    current = stack[stack.length - 1];
    // 如果右子樹為空或已訪問過，則訪問根節點
    if (!current.right || current.right === lastVisited) {
      result.push(current.val); // 訪問根節點
      lastVisited = current;
      stack.pop();
      current = null;
    } else {
      current = current.right; // 遍歷右子樹
    }
  }

  return result;
}
