import { assert } from "vitest";

// Problem 1 - Bubble sort
export function bubbleSort(sequence) {
  const n = sequence.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sequence[j] > sequence[j + 1]) {
        [sequence[j], sequence[j + 1]] = [sequence[j + 1], sequence[j]];
      }
    }
  }

  return sequence;
}

assert.deepEqual(bubbleSort([5, 1, 3, 2, 4]), [1, 2, 3, 4, 5]);

// Problem 2 - Find second largest within O(n) complexity.
export function findSecondLargest(sequence: number[]): number {
  let first = -Infinity,
    second = -Infinity;
  for (const num of sequence) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num < first) {
      second = num;
    }
  }
  return second;
}

assert.equal(findSecondLargest([3, 3, 2, 1]), 2);
assert.equal(findSecondLargest([3, 3, 4, 2, 1]), 3);

// 更快的寫法來尋找第二大的數字
export function findSecondLargestOptimized(sequence: number[]): number {
  if (sequence.length < 2) {
    throw new Error("Sequence must contain at least two numbers");
  }

  let first = -Infinity,
    second = -Infinity;
  for (const num of sequence) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num < first) {
      second = num;
    }
  }

  if (second === -Infinity) {
    throw new Error("No second largest number found");
  }

  return second;
}

assert.equal(findSecondLargestOptimized([3, 3, 2, 1]), 2);
assert.equal(findSecondLargestOptimized([3, 3, 4, 2, 1]), 3);

// Problem 3 - Closure
// Write some example(s) about how you take advantage of closure

// Example 1: Counter
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Example 2: Private variable
function createPerson(name: string) {
  let _name = name;
  return {
    getName: function () {
      return _name;
    },
    setName: function (newName: string) {
      _name = newName;
    },
  };
}

const person = createPerson("Alice");
console.log(person.getName()); // Alice
person.setName("Bob");
console.log(person.getName()); // Bob

// Example 3: Function factory
function multiplier(factor: number) {
  return function (number: number) {
    return number * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10
console.log(double(10)); // 20

const triple = multiplier(3);
console.log(triple(5)); // 15
console.log(triple(10)); // 30

// Problem 4 - Hoisting
// Write some example(s) to explain the concept of hoisting

// Problem 6 - Handling array
// Given below data, please write code to output all users under 40 years old in below format:
// 1. Mr. Daniel Deng (age 11)
// 2. Mrs. Maria Hanington (age 33)
// ...

const users = [
  {
    firstName: "Freddie",
    lastName: "Hong",
    gender: "male",
    age: 32,
    married: true,
  },
  {
    firstName: "Shaquille",
    lastName: "Fang",
    gender: "male",
    age: 3,
    married: false,
  },
  {
    firstName: "Justin",
    lastName: "Fan",
    gender: "male",
    age: 42,
    married: true,
  },
  {
    firstName: "Sophia",
    lastName: "Liu",
    gender: "female",
    age: 12,
    married: false,
  },
  {
    firstName: "Maxwell",
    lastName: "Jeng",
    gender: "male",
    age: 43,
    married: false,
  },
];

function formatUsers(users) {
  return users
    .filter((user) => user.age < 40)
    .sort((a, b) => a.age - b.age)
    .map((user, index) => {
      const title = user.gender === "male" ? "Mr." : "Mrs.";
      return `${index + 1}. ${title} ${user.firstName} ${user.lastName} (age ${
        user.age
      })`;
    })
    .join("\n");
}

console.log(formatUsers(users));

// Problem 7 - Immutability
// Write some example(s) to explain the concept of immutability and what's the benefit of it, especially on performance
