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

type PromiseState = "pending" | "fulfilled" | "rejected";
type Executor<T> = (
  resolve: (value: T) => void,
  reject: (reason?: any) => void,
) => void;

class MyPromise<T> {
  private state: PromiseState = "pending";
  private value: T | undefined;
  private reason: any;
  private onFulfilledCallbacks: (() => void)[] = [];
  private onRejectedCallbacks: (() => void)[] = [];

  constructor(executor: Executor<T>) {
    try {
      executor(
        (value: T) => this.resolve(value),
        (reason: any) => this.reject(reason),
      );
    } catch (error) {
      this.reject(error);
    }
  }

  private resolve(value: T): void {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCallbacks.forEach((callback) => callback());
    }
  }

  private reject(reason: any): void {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;
      this.onRejectedCallbacks.forEach((callback) => callback());
    }
  }

  then<U>(
    onFulfilled?: (value: T) => U | PromiseLike<U>,
    onRejected?: (reason: any) => U | PromiseLike<U>,
  ): MyPromise<U> {
    return new MyPromise<U>((resolve, reject) => {
      if (this.state === "fulfilled") {
        setTimeout(() => {
          try {
            const result = onFulfilled
              ? onFulfilled(this.value!)
              : (this.value as any);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === "rejected") {
        setTimeout(() => {
          try {
            const result = onRejected ? onRejected(this.reason) : this.reason;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      } else {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onFulfilled
                ? onFulfilled(this.value!)
                : (this.value as any);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onRejected ? onRejected(this.reason) : this.reason;
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
  }

  catch<U>(onRejected?: (reason: any) => U | PromiseLike<U>): MyPromise<U> {
    return this.then(undefined, onRejected);
  }

  static resolve<T>(value: T): MyPromise<T> {
    return new MyPromise<T>((resolve) => resolve(value));
  }

  static reject(reason: any): MyPromise<never> {
    return new MyPromise((_, reject) => reject(reason));
  }
}

export default MyPromise;
