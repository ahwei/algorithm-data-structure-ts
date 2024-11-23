import { describe, expect, it } from "vitest";
import { ListNode } from "./linkedlist";

describe("Linked List Algorithms", () => {
  it("should return a number from the linked list", () => {
    const n0 = new ListNode(1);
    const n1 = new ListNode(3);
    const n2 = new ListNode(2);
    const n3 = new ListNode(5);
    const n4 = new ListNode(4);
    n0.next = n1;
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;

    expect(n0.next).toBe(n1);
    expect(n1.next).toBe(n2);
    expect(n2.next).toBe(n3);
    expect(n3.next).toBe(n4);
    expect(n4.next).toBeNull();
  });
});
