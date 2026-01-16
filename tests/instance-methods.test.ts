import { describe, expect, it } from "vitest";
import WatchablePromise from "../src/index.js";

describe("WatchablePromise: instance methods", () => {
  it("can be resolved externally", async () => {
    const p = new WatchablePromise<string>((resolve, reject) => {
      //
    });
    p.resolve("foo");
    await expect(p).resolves.toBe("foo");
    expect(p.state).toBe("fulfilled");
    expect(p.value).toBe("foo");
  });

  it("can be rejected externally", async () => {
    const p = new WatchablePromise<string>((resolve, reject) => {
      //
    });
    p.reject("foo");
    await expect(p).rejects.toBe("foo");
    expect(p.state).toBe("rejected");
    expect(p.value).toBe("foo");
  });
});

describe("WatchablePromise: instance methods (from existing)", () => {
  it("can be resolved externally", async () => {
    const existingPromise = new Promise<string>((resolve) =>
      setTimeout(() => resolve("foo"), 1000),
    );

    const p = WatchablePromise.from(existingPromise);
    p.resolve("bar"); // This will resolve before the existingPromise can resolve

    await expect(p).resolves.toBe("bar");
    expect(p.state).toBe("fulfilled");
    expect(p.value).toBe("bar");
  });

  it("can be rejected externally", async () => {
    const existingPromise = new Promise<string>((_, reject) =>
      setTimeout(() => reject("foo"), 1000),
    );

    const p = WatchablePromise.from(existingPromise);
    p.reject("bar"); // This will reject before the existingPromise can reject

    await expect(p).rejects.toBe("bar");
    expect(p.state).toBe("rejected");
    expect(p.value).toBe("bar");
  });
});
