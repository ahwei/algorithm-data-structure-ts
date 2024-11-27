export function promiseOrder1() {
  const output: number[] = [];

  output.push(1);
  const promise = new Promise<void>((resolve) => {
    output.push(2);
    resolve();
    output.push(3);
  });

  output.push(4);

  promise
    .then(() => {
      output.push(5);
    })
    .then(() => {
      output.push(6);
    });

  output.push(7);

  setTimeout(() => {
    output.push(8);
  }, 10);

  setTimeout(() => {
    output.push(9);
  }, 0);

  return output;
}

export function promiseOrder2() {
  const output: number[] = [];

  output.push(1);
  Promise.resolve()
    .then(() => output.push(2))
    .then(() => output.push(3));
  output.push(4);

  return output;
}

export function promiseOrder3() {
  const output: number[] = [];

  output.push(1);
  Promise.reject()
    .catch(() => output.push(2))
    .then(() => output.push(3));
  output.push(4);

  return output;
}

export function promiseOrder4() {
  const output: number[] = [];

  output.push(1);
  Promise.resolve()
    .then(() => {
      output.push(2);
      throw new Error();
    })
    .catch(() => output.push(3))
    .then(() => output.push(4));
  output.push(5);

  return output;
}

export function promiseOrder5() {
  const output: number[] = [];

  output.push(1);
  new Promise((resolve) => setTimeout(resolve, 0)).then(() => output.push(2));
  setTimeout(() => output.push(3), 0);
  output.push(4);

  return output;
}
