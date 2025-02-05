//題目 1：實作深拷貝函式 deepClone
export function deepClone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

//題目 2：題目 2：實作事件發射器（EventEmitter）
export class EventEmitter {
  private events: Record<string, Array<(...args: any[]) => void>> = {};

  on(event: string, callback: (...args: any[]) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  off(event: string, callback: (...args: any[]) => void) {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }
  emit(event: string, ...args: any[]) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((cb) => cb(...args));
  }
}

//題目 3：實作 Promise.all
export function promiseAll(promises: Promise<any>[]): Promise<any[]> {
  const results: any[] = [];
  let completed = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((result) => {
          results[index] = result;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

//題目 4：實作函式防抖（debounce）與節流（throttle）
export function debounce(fn, delay) {
  let timeoutId: NodeJS.Timeout | null = null;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

export function throttle(fn, delay) {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn(...args);
      lastTime = now;
    }
  };
}

export function throttleTimeout(fn, delay) {
  let timeoutId: NodeJS.Timeout | null = null;
  return function (...args) {
    if (!timeoutId) {
      fn(...args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
  };
}

//題目 5：實作簡單的觀察者模式（Observer Pattern）

export class Observer {
  private observers: Array<() => void> = [];

  subscribe(observer: () => void) {
    this.observers.push(observer);
  }

  unsubscribe(observer: () => void) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify() {
    this.observers.forEach((observer) => observer());
  }
}
