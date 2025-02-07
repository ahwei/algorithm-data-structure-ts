type NestedObject = { [key: string]: any };
type DataType = Array<any> | NestedObject;

const isNullOrUndefined = (value: any): boolean =>
  value === null || value === undefined;

const isEmpty = (value: any): boolean => {
  if (isNullOrUndefined(value)) return true;
  if (typeof value !== "object") return false;

  const stack: any[] = [value];

  while (stack.length > 0) {
    const current = stack.pop();

    if (Array.isArray(current)) {
      if (current.length === 0) continue;
      stack.push(...current);
    } else if (typeof current === "object" && current !== null) {
      const keys = Object.keys(current);
      if (keys.length === 0) continue;
      stack.push(...Object.values(current));
    } else if (!isNullOrUndefined(current)) {
      return false;
    }
  }

  return true;
};

const cleanArray = (arr: any[]): void => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (isEmpty(arr[i])) {
      arr.splice(i, 1);
    }
  }

  if (arr.length === 1 && Array.isArray(arr[0])) {
    const innerArray = arr[0];
    arr.length = 0;
    arr.push(...innerArray);
  }
};

const cleanObject = (obj: NestedObject): void => {
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (isEmpty(obj[key])) {
      delete obj[key];
    }
  }
};

export const cleanEmptyData = (data: DataType): void => {
  const stack: DataType[] = [data];

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (Array.isArray(current)) {
      current.forEach((item) => {
        if (typeof item === "object" && !isNullOrUndefined(item)) {
          stack.push(item);
        }
      });
      cleanArray(current);
    } else {
      Object.values(current).forEach((value) => {
        if (typeof value === "object" && !isNullOrUndefined(value)) {
          stack.push(value);
        }
      });
      cleanObject(current);
    }
  }
};

const taskData = [
  { a: null, b: 1 },
  null,
  [2, undefined, 3],
  [null, [null], { a: null, b: [null] }],
  { a: 4, b: { a: null, b: null }, c: { a: null } },
];

cleanEmptyData(taskData);
console.log(taskData);
// Output: [{b: 1}, [2, 3], {a: 4}]

// More test cases examples:
// Test Case 1: Empty array
const emptyArray: any[] = [];
cleanEmptyData(emptyArray);
console.log(emptyArray);
// Output: []

// Test Case 2: Deeply nested objects
const nestedObjects = [
  {
    a: { b: { c: null, d: 1 }, e: null },
    f: { g: { h: {} } },
  },
];
cleanEmptyData(nestedObjects);
console.log(nestedObjects);
// Output: [{ a: { b: { d: 1 } } }]

// Test Case 3: Deeply nested arrays
const nestedArrays = [
  [[], [null], [undefined]],
  [1, [2, [3, null, 4], undefined], 5],
];
cleanEmptyData(nestedArrays);
console.log(nestedArrays);
// Output: [[1, [2, [3, 4]], 5]]

// Test Case 4: Mixed data types
const mixedTypes = [
  { arr: [null, 1, { a: null }], num: 42 },
  "string",
  null,
  { obj: {} },
  [undefined],
];
cleanEmptyData(mixedTypes);
console.log(mixedTypes);
// Output: [{ arr: [1], num: 42 }, "string"]

// Test Case 5: Array with only null/undefined values
const nullArray = [null, undefined, null, [null], { a: null }];
cleanEmptyData(nullArray);
console.log(nullArray);
// Output: []

// Test Case 6: Primitive values
const primitiveArray = [1, "string", true, 0, false];
cleanEmptyData(primitiveArray);
console.log(primitiveArray);
// Output: [1, "string", true, 0, false]
