export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function insert(node: ListNode, val: number): void {
  let current = node;
  while (current.next !== null) {
    current = current.next;
  }
  current.next = new ListNode(val);
}

export function remove(node: ListNode, val: number): void {
  let current = node;
  while (current.next !== null) {
    if (current.next.val === val) {
      current.next = current.next.next;
      return;
    }
    current = current.next;
  }
}

export function access(node: ListNode, index: number): number | undefined {
  let current = node;
  for (let i = 0; i < index; i++) {
    if (current.next === null) {
      return undefined;
    }
    current = current.next;
  }
  return current.val;
}
