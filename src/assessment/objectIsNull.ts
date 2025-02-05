// 3)	Code challenge: The below is a coding test, we do not necessarily expect the correct answer, we would like your best answer even if it isn’t perfect. How you approach the question is as important as the final answer. Please take your time. Any resources may be used.

// In JavaScript, WITHOUT USING RECURSION, write and call a method or methods that will mutate and remove all null and undefined values, and any empty objects (AFTER removal of null/undefined) from the task array. You must not use recursion.

// An example "taskData" constant is provided, but the method should work for any object or array with any number of nested objects or arrays. NOTE - you must mutate "taskData" and all its nested arrays/objects, not create new arrays/objects.

// Hint - the expected result is: "[{b: 1}, [2, 3], {a: 4}]"

const taskData = [
  { a: null, b: 1 },
  null,
  [2, undefined, 3],
  [null, [null], { a: null, b: [null] }],
  { a: 4, b: { a: null, b: null }, c: { a: null } },
];

const isEmptyOrNull = (item: any): boolean => {
  const stack: any[] = [item];

  while (stack.length > 0) {
    const current = stack.pop();

    if (current === null || current === undefined) continue;
    if (typeof current !== "object") return false;

    if (Array.isArray(current)) {
      if (current.length === 0) continue;
      for (const elem of current) {
        stack.push(elem);
      }
    } else {
      const keys = Object.keys(current);
      if (keys.length === 0) continue;
      for (const key of keys) {
        stack.push(current[key]);
      }
    }
  }

  return true;
};

export const cleanEmptyData = (taskData: any[]): void => {
  const stack = [taskData];

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (Array.isArray(current)) {
      for (let i = 0; i < current.length; i++) {
        if (typeof current[i] === "object" && current[i] !== null) {
          stack.push(current[i]);
        }
      }

      for (let i = current.length - 1; i >= 0; i--) {
        if (isEmptyOrNull(current[i])) {
          current.splice(i, 1);
        }
      }
    } else if (typeof current === "object") {
      for (const key of Object.keys(current)) {
        if (typeof current[key] === "object" && current[key] !== null) {
          stack.push(current[key]);
        }
      }

      for (const key of Object.keys(current)) {
        if (isEmptyOrNull(current[key])) {
          delete current[key];
        }
      }
    }
  }
};

cleanEmptyData(taskData);

console.log(taskData);
// Output: [{b: 1}, [2, 3], {a: 4}]
