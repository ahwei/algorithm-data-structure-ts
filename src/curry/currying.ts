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
