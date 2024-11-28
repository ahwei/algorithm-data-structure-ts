function change(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
//[8, 1, 3, 2, 5, 4, 6, 7]

export function bubbleSort(numbers: number[]): number[] {
  const n = numbers.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        change(numbers, j, j + 1);
      }
    }
  }

  return numbers;
}

export function bubbleSortDescending(numbers: number[]): number[] {
  const n = numbers.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = n - 1; j > i; j--) {
      if (numbers[j] < numbers[j - 1]) {
        change(numbers, j, j - 1);
      }
    }
  }

  return numbers;
}

export function selectionSort(numbers: number[]): number[] {
  const n = numbers.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i; j < n - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        change(numbers, j, j + 1);
      }
    }
  }

  return numbers;
}
