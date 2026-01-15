import { describe, it, expect } from "vitest";
import WatchablePromise from "../src/index";

describe("WatchablePromise Symbols", () => {
  it("has a Symbol.toStringTag", () => {
    const wp = new WatchablePromise(() => {});
    expect(wp[Symbol.toStringTag]).toBe("WatchablePromise");
  });

  it(".then() should return a native Promise", () => {
    const wp = new WatchablePromise(() => {});
    const p = wp.then(() => {});
    expect(p).not.toBeInstanceOf(WatchablePromise);
    expect(p).toBeInstanceOf(Promise);
  });
});
