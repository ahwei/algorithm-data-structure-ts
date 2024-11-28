import { describe, expect, it } from "vitest";
import {
  bubbleSort,
  bubbleSortDescending,
  quickSort,
  selectionSort,
} from "./sort";

const question = [8, 1, 3, 2, 5, 4, 6, 7];
const answer = [1, 2, 3, 4, 5, 6, 7, 8];
describe("sort can work", () => {
  it("should bubble sort numbers", () => {
    const result = bubbleSort(question);
    expect(result).toEqual(answer);
  });

  it("should bubble sort descending numbers", () => {
    const result = bubbleSortDescending(question);
    expect(result).toEqual(answer);
  });

  it("should selection sort numbers", () => {
    const result = selectionSort(question);
    expect(result).toEqual(answer);
  });

  it("should quick sort numbers", () => {
    const result = quickSort(question);
    expect(result).toEqual(answer);
  });
});
