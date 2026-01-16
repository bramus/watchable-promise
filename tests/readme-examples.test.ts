import { describe, it, expect } from "vitest";
import WatchablePromise from "../src/index";

describe("README Examples", () => {
  it("should work with an existing Promise", async () => {
    const existingPromise = new Promise<string>((resolve) =>
      setTimeout(() => resolve("foo"), 100),
    );
    const p = WatchablePromise.from(existingPromise);

    expect(p.state).toBe("pending");
    expect(p.settled).toBe(false);

    const result = await p;

    expect(result).toBe("foo");
    expect(p.state).toBe("fulfilled");
    expect(p.settled).toBe(true);
  });

  it("should work with WatchablePromise.withResolvers()", async () => {
    const { promise, resolve } = WatchablePromise.withResolvers<string>();

    expect(promise.state).toBe("pending");
    expect(promise.settled).toBe(false);

    resolve("foo");

    const result = await promise;

    expect(result).toBe("foo");
    expect(promise.state).toBe("fulfilled");
    expect(promise.settled).toBe(true);
  });
});
