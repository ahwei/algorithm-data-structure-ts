type NestedObject = { [key: string]: any };
type DataType = Array<any> | NestedObject;

const isNullOrUndefined = (element: any): boolean =>
  element === null || element === undefined;

const isEmpty = (targetValue: any): boolean => {
  if (isNullOrUndefined(targetValue)) return true;
  if (typeof targetValue !== "object") return false;

  const pendingItems: any[] = [targetValue];

  while (pendingItems.length > 0) {
    const currentItem = pendingItems.pop();

    if (Array.isArray(currentItem)) {
      if (currentItem.length === 0) continue;
      pendingItems.push(...currentItem);
    } else if (typeof currentItem === "object" && currentItem !== null) {
      const propertyKeys = Object.keys(currentItem);
      if (propertyKeys.length === 0) continue;
      pendingItems.push(...Object.values(currentItem));
    } else if (!isNullOrUndefined(currentItem)) {
      return false;
    }
  }

  return true;
};

const cleanArray = (targetArray: any[]): void => {
  for (let arrayIndex = targetArray.length - 1; arrayIndex >= 0; arrayIndex--) {
    if (isEmpty(targetArray[arrayIndex])) {
      targetArray.splice(arrayIndex, 1);
    }
  }

  if (targetArray.length === 1 && Array.isArray(targetArray[0])) {
    const nestedArray = targetArray[0];
    targetArray.length = 0;
    targetArray.push(...nestedArray);
  }
};

const cleanObject = (targetObject: NestedObject): void => {
  const propertyKeys = Object.keys(targetObject);
  for (const propertyName of propertyKeys) {
    if (isEmpty(targetObject[propertyName])) {
      delete targetObject[propertyName];
    }
  }
};

export const cleanEmptyData = (sourceData: DataType): void => {
  const pendingData: DataType[] = [sourceData];

  while (pendingData.length > 0) {
    const currentData = pendingData.pop()!;

    if (Array.isArray(currentData)) {
      currentData.forEach((nestedItem) => {
        if (typeof nestedItem === "object" && !isNullOrUndefined(nestedItem)) {
          pendingData.push(nestedItem);
        }
      });
      cleanArray(currentData);
    } else {
      Object.values(currentData).forEach((nestedValue) => {
        if (
          typeof nestedValue === "object" &&
          !isNullOrUndefined(nestedValue)
        ) {
          pendingData.push(nestedValue);
        }
      });
      cleanObject(currentData);
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
