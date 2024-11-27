export function flat(arr: any[], depth = 1) {
  return arr.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      if (depth === 1) {
        return [...acc, ...curr];
      } else {
        return [...acc, ...flat(curr, depth - 1)];
      }
    }

    return [...acc, curr];
  }, []);
}

export function flatSpaceLow(arr: any[], depth = 1): any[] {
  const result: any[] = [];

  function helper(subArr: any[], currentDepth: number) {
    for (const item of subArr) {
      if (Array.isArray(item) && currentDepth > 0) {
        helper(item, currentDepth - 1); // 遞歸處理內層陣列
      } else {
        result.push(item); // 非陣列項目直接加入結果
      }
    }
  }

  helper(arr, depth);
  return result;
}
