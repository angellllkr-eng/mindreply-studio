// Stand-in for vitest, built only on Node's zero-install built-ins
// (node:test, node:assert/strict). This exists SOLELY because the sandbox
// this was built in has no npm registry access - it is not part of the
// shipped project's design. Once you `npm install` for real, delete this
// file and change the test imports back to "vitest" - the test files
// themselves don't otherwise care which runner executes them.
import { describe, it } from "node:test";
import assert from "node:assert/strict";

export { describe, it };

type MockFn = ((...args: any[]) => any) & {
  mock: { calls: any[][] };
  mockResolvedValue(v: unknown): MockFn;
  mockRejectedValue(v: unknown): MockFn;
  mockImplementation(fn: (...args: any[]) => any): MockFn;
};

export const vi = {
  fn(): MockFn {
    let impl: (...args: any[]) => any = () => undefined;
    const calls: any[][] = [];
    const f = ((...args: any[]) => {
      calls.push(args);
      return impl(...args);
    }) as MockFn;
    f.mock = { calls };
    f.mockResolvedValue = (v: unknown) => {
      impl = () => Promise.resolve(v);
      return f;
    };
    f.mockRejectedValue = (v: unknown) => {
      impl = () => Promise.reject(v);
      return f;
    };
    f.mockImplementation = (fn: (...args: any[]) => any) => {
      impl = fn;
      return f;
    };
    return f;
  },
};

class Expectation {
  constructor(
    private actual: unknown,
    private negate = false,
  ) {}

  private check(pass: boolean, message: string) {
    const finalPass = this.negate ? !pass : pass;
    assert.ok(finalPass, message);
  }

  toBe(expected: unknown) {
    this.check(Object.is(this.actual, expected), `expected ${String(this.actual)} to be ${String(expected)}`);
  }

  toEqual(expected: unknown) {
    try {
      assert.deepStrictEqual(this.actual, expected);
      this.check(true, "");
    } catch {
      this.check(false, `expected deepStrictEqual to ${JSON.stringify(expected)}, got ${JSON.stringify(this.actual)}`);
    }
  }

  toBeNull() {
    this.check(this.actual === null, `expected null, got ${String(this.actual)}`);
  }

  toBeUndefined() {
    this.check(this.actual === undefined, `expected undefined, got ${String(this.actual)}`);
  }

  toHaveLength(n: number) {
    const len = (this.actual as { length: number }).length;
    this.check(len === n, `expected length ${n}, got ${len}`);
  }

  toMatch(re: RegExp) {
    this.check(re.test(String(this.actual)), `expected ${String(this.actual)} to match ${re}`);
  }

  toHaveBeenCalledTimes(n: number) {
    const calls = (this.actual as MockFn).mock.calls.length;
    this.check(calls === n, `expected ${n} calls, got ${calls}`);
  }

  toThrow(ErrClass?: new (...args: any[]) => Error) {
    let threw = false;
    let err: unknown;
    try {
      (this.actual as () => unknown)();
    } catch (e) {
      threw = true;
      err = e;
    }
    this.check(threw && (!ErrClass || err instanceof ErrClass), `expected function to throw ${ErrClass?.name ?? "an error"}`);
  }

  get resolves() {
    const outer = this;
    return {
      async toBeUndefined() {
        const v = await (outer.actual as Promise<unknown>);
        assert.strictEqual(v, undefined);
      },
    };
  }

  get rejects() {
    const outer = this;
    return {
      async toThrow(ErrClass?: new (...args: any[]) => Error) {
        let threw = false;
        let err: unknown;
        try {
          await (outer.actual as Promise<unknown>);
        } catch (e) {
          threw = true;
          err = e;
        }
        assert.ok(threw, "expected promise to reject");
        if (ErrClass) assert.ok(err instanceof ErrClass, `expected rejection to be instance of ${ErrClass.name}, got ${String(err)}`);
      },
    };
  }

  get not() {
    return new Expectation(this.actual, !this.negate);
  }
}

export function expect(actual: unknown): Expectation {
  return new Expectation(actual);
}
