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
  if (item === null || item === undefined) return true;
  if (typeof item !== "object") return false;
  if (Array.isArray(item)) {
    const filtered = item.filter((x) => !isEmptyOrNull(x));
    return filtered.length === 0;
  }

  const filteredKeys = Object.keys(item).filter(
    (key) => !isEmptyOrNull(item[key]),
  );
  return filteredKeys.length === 0;
};

export const cleanEmptyData = (taskData: any[]) => {
  const stack = [{ arr: taskData, index: -1 }];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const container = current.arr;

    if (Array.isArray(container)) {
      current.index++;

      if (current.index >= container.length) {
        for (let i = container.length - 1; i >= 0; i--) {
          if (isEmptyOrNull(container[i])) {
            container.splice(i, 1);
          }
        }
        stack.pop();
        continue;
      }

      if (
        typeof container[current.index] === "object" &&
        container[current.index] !== null
      ) {
        stack.push({ arr: container[current.index], index: -1 });
      }
    } else {
      const keys = Object.keys(container);
      current.index++;

      if (current.index >= keys.length) {
        for (const key of keys) {
          if (isEmptyOrNull(container[key])) {
            delete container[key];
          }
        }
        stack.pop();
        continue;
      }

      const key = keys[current.index];
      if (typeof container[key] === "object" && container[key] !== null) {
        stack.push({ arr: container[key], index: -1 });
      }
    }
  }
};

cleanEmptyData(taskData);

console.log(taskData);
// Output: [{b: 1}, [2, 3], {a: 4}]
