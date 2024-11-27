type curryFn = (...arg: any[]) => any;

// 原始的 apply 版本
export function curry(fn: curryFn) {
  return function curried(...args: any[]) {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return (...moreArgs: any[]) => curried(...args, ...moreArgs);
  };
}

export function curryWithApply(fn: curryFn) {
  return function curried(this: any, ...args: any[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (this: any, ...moreArgs: any[]) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// call 版本
export function curryWithCall(fn: curryFn) {
  return function curried(this: any, ...args: any[]) {
    if (args.length >= fn.length) {
      return fn.call(this, ...args);
    }
    return (...moreArgs: any[]) => {
      return curried.call(this, ...args, ...moreArgs);
    };
  };
}

// bind 版本
export function curryWithBind(fn: curryFn) {
  return function curried(this: any, ...args: any[]) {
    if (args.length >= fn.length) {
      const boundFn = fn.bind(this);
      return boundFn(...args);
    }
    return curried.bind(this, ...args);
  };
}

// 混合版本 (同時展示三種方法)
export function curryMixed(fn: curryFn) {
  return function curried(this: any, ...args: any[]) {
    if (args.length >= fn.length) {
      // 使用 apply
      return fn.apply(this, args);
    }
    // 使用 bind
    const boundCurried = curried.bind(this);
    // 使用 call
    return (...moreArgs: any[]) =>
      boundCurried.call(this, ...args, ...moreArgs);
  };
}

export function curryAdvance(fn) {
  return function curried(...args: any[]) {
    if (
      //如果參數的長度大於等於fn的長度，並且參數中沒有占位符
      args.length >= fn.length &&
      args
        .slice(0, fn.length)
        .every((item) => item !== curryAdvance.placeholder)
    ) {
      return fn(...args);
    }

    return function (...nextArgs: any[]) {
      // 如果是占位符，就用 nextArgs 的第一個參數替換
      const mappedArgsTo = args.map((item) =>
        item === curryAdvance.placeholder ? nextArgs.shift() : item,
      );

      return curried(...mappedArgsTo, ...nextArgs);
    };
  };
}

curryAdvance.placeholder = Symbol();
