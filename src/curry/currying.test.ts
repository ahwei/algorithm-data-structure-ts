import { describe, expect, it } from "vitest";
import { curry, curryMixed, curryWithBind, curryWithCall } from "./currying";

describe("apply, call, bind examples", () => {
  it("should demonstrate apply usage", () => {
    const person = {
      name: "John",
      greet: function (prefix: string, suffix: string) {
        return `${prefix} ${this.name} ${suffix}`;
      },
    };

    const anotherPerson = { name: "Jane" };
    expect(person.greet.apply(anotherPerson, ["Hello", "!"])).toBe(
      "Hello Jane !",
    );
  });

  it("should demonstrate call usage", () => {
    function greet(this: any, greeting: string) {
      return `${greeting}, ${this.name}`;
    }

    const person = { name: "John" };
    expect(greet.call(person, "Hi")).toBe("Hi, John");
  });

  it("should demonstrate bind usage", () => {
    const multiply = function (this: { rate: number }, n: number) {
      return n * this.rate;
    };

    const double = multiply.bind({ rate: 2 });
    const triple = multiply.bind({ rate: 3 });

    expect(double(5)).toBe(10);
    expect(triple(5)).toBe(15);
  });

  it("should show practical curry with bind", () => {
    function greet(this: string, greeting: string, name: string): string {
      return `${greeting}, ${name}!, by ${this}!`;
    }
    const name = "AhWei";

    const sayHelloUseBind = greet.bind(name, "Hello");
    expect(sayHelloUseBind("John")).toBe("Hello, John!, by AhWei!");

    const sayHelloUseCall = greet.call(name, "Hello", "John");
    expect(sayHelloUseCall).toBe("Hello, John!, by AhWei!");

    const sayHelloUseApply = greet.apply(name, ["Hello", "John"]);
    expect(sayHelloUseApply).toBe("Hello, John!, by AhWei!");
  });
});

describe("currying examples", () => {
  it("should work with curryWith Apply", () => {
    const join = (a: number, b: number, c: number) => {
      return `${a}_${b}_${c}`;
    };
    const curriedJoin = curry(join);

    expect(curriedJoin(1, 2, 3)).toBe("1_2_3");
    expect(curriedJoin(1)(2, 3)).toBe("1_2_3");
    expect(curriedJoin(1, 2)(3)).toBe("1_2_3");
  });

  it("should work with curryWithCall", () => {
    const join = (a: number, b: number, c: number) => `${a}_${b}_${c}`;
    const curriedJoin = curryWithCall(join);

    expect(curriedJoin(1, 2, 3)).toBe("1_2_3");
    expect(curriedJoin(1)(2, 3)).toBe("1_2_3");
    expect(curriedJoin(1, 2)(3)).toBe("1_2_3");
  });

  it("should work with curryWithBind", () => {
    const join = (a: number, b: number, c: number) => `${a}_${b}_${c}`;
    const curriedJoin = curryWithBind(join);

    expect(curriedJoin(1, 2, 3)).toBe("1_2_3");
    expect(curriedJoin(1)(2, 3)).toBe("1_2_3");
    expect(curriedJoin(1, 2)(3)).toBe("1_2_3");
  });

  it("should work with curryMixed", () => {
    const join = (a: number, b: number, c: number) => `${a}_${b}_${c}`;
    const curriedJoin = curryMixed(join);

    expect(curriedJoin(1, 2, 3)).toBe("1_2_3");
    expect(curriedJoin(1)(2, 3)).toBe("1_2_3");
    expect(curriedJoin(1, 2)(3)).toBe("1_2_3");
  });

  // Context binding test
  it("should maintain correct this context", () => {
    const obj = {
      multiplier: 2,
      multiply: function (a: number, b: number) {
        return a * b * this.multiplier;
      },
    };

    const curriedMultiply = curryMixed(obj.multiply.bind(obj));
    expect(curriedMultiply(3)(4)).toBe(24); // 3 * 4 * 2
  });

  it("should demonstrate complex currying scenarios", () => {
    // 定義一個複雜的問候函數
    function complexGreet(
      prefix: string,
      greeting: string,
      name: string,
      suffix: string,
    ) {
      return `${prefix} ${greeting}, ${name}${suffix}`;
    }

    // 測試不同的 currying 方式
    const formalGreetBind = complexGreet.bind(null, "Dear");
    expect(formalGreetBind("Hello", "John", "!")).toBe("Dear Hello, John!");

    const formalGreetCurry = curry(complexGreet)("Dear");
    expect(formalGreetCurry("Hi")("Alice")("...")).toBe("Dear Hi, Alice...");

    // 組合多個 curry 函數
    const casualGreet = curry(complexGreet)("Hey")("What's up");
    const greetJohn = casualGreet("John");
    const greetMary = casualGreet("Mary");

    expect(greetJohn("?")).toBe("Hey What's up, John?");
    expect(greetMary("!")).toBe("Hey What's up, Mary!");
  });
});
