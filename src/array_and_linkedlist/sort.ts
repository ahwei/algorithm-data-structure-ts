function change(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * 氣泡排序法 (升序)
 * 時間複雜度：O(n²) - 需要兩層迴圈
 * 空間複雜度：O(1) - 只需要一個臨時變數進行交換
 */
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

/**
 * 氣泡排序法 (降序)
 * 時間複雜度：O(n²) - 需要兩層迴圈
 * 空間複雜度：O(1) - 只需要一個臨時變數進行交換
 */
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

/**
 * 選擇排序法
 * 時間複雜度：O(n²) - 需要兩層迴圈
 * 空間複雜度：O(1) - 只需要一個臨時變數進行交換
 */
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

/**
 * 快速排序法
 * 時間複雜度：O(n log n) - 平均情況下，快速排序的時間複雜度是 O(n log n)，但在最壞情況下會退化到 O(n²)
 * 空間複雜度：O(log n) - 由於遞歸調用棧的深度平均為 log n
 */

export function quickSort(numbers: number[]): number[] {
  if (numbers.length <= 1) {
    return numbers;
  }

  const n = numbers.length;
  const pivot = numbers[Math.floor(n / 2)];
  const left = numbers.filter((num) => num < pivot);
  const right = numbers.filter((num) => num > pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
}
