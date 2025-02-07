import { describe, expect, it } from "vitest";

declare global {
  interface Function {
    myCall(ctx: any, ...args: any[]): any;
  }
}

Function.prototype.myCall = function (ctx, ...args) {
  if (ctx === undefined || ctx === null) {
    ctx = typeof window !== "undefined" ? window : global;
  }

  if (typeof ctx === "number") ctx = new Number(ctx);
  if (typeof ctx === "string") ctx = new String(ctx);
  if (typeof ctx === "boolean") ctx = new Boolean(ctx);

  const fn = Symbol();
  ctx[fn] = this;
  const result = ctx[fn](...args);
  delete ctx[fn];
  return result;
};

describe("Function.prototype.myCall", () => {
  it("should demonstrate call usage", () => {
    const obj = {
      name: "testing02",
    };

    function foo(this: any) {
      return Object.prototype.toString.call(this).slice(8, -1);
    }

    expect(foo.myCall(undefined)).toBe("Window");
    expect(foo.myCall(null)).toBe("Window");
    expect(foo.myCall(1)).toBe("Number");
    expect(foo.myCall("11")).toBe("String");
    expect(foo.myCall(true)).toBe("Boolean");
    expect(foo.myCall(obj)).toBe("Object");

    function successFn(this: any) {
      return "success";
    }
    expect(successFn.myCall(obj)).toBe("success");
  });
});
