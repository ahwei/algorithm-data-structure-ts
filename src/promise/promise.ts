export function all<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    // if no promises, return empty array
    if (promises.length === 0) {
      resolve([]);
    }

    const results: T[] = new Array(promises.length);
    let completedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completedCount++;

          // 當所有 promise 都完成時，回傳結果陣列
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// use case
/*
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 1000));
const p3 = Promise.resolve(3);

promiseAll([p1, p2, p3])
    .then(results => console.log(results))  // [1, 2, 3]
    .catch(error => console.error(error));
*/
