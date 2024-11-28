import { describe, expect, it } from "vitest";
import { TreeNode } from "./binaryTree";

describe("TreeNode", () => {
  it("應該使用預設值正確初始化節點", () => {
    const node = new TreeNode();
    expect(node.val).toBe(0);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  it("應該使用提供的值正確初始化節點", () => {
    const node = new TreeNode(5);
    expect(node.val).toBe(5);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  it("應該正確連接左右子節點", () => {
    const leftNode = new TreeNode(2);
    const rightNode = new TreeNode(3);
    const rootNode = new TreeNode(1, leftNode, rightNode);

    expect(rootNode.val).toBe(1);
    expect(rootNode.left).toBe(leftNode);
    expect(rootNode.right).toBe(rightNode);
    expect(rootNode.left?.val).toBe(2);
    expect(rootNode.right?.val).toBe(3);
  });
});
