import { describe, it, expect } from "vitest";
import WatchablePromise from "../src/index";

describe("WatchablePromise Constructor", () => {
  it("should throw when incorrectly creating a WatchablePromise", () => {
    // @ts-ignore
    expect(() => new WatchablePromise()).toThrow("executor is not a function");
  });

  it("should create a pending promise", () => {
    const wp = new WatchablePromise(() => {});
    expect(wp).toBeInstanceOf(WatchablePromise);
    expect(wp).toBeInstanceOf(Promise);
    expect(wp.settled).toBe(false);
    expect(wp.state).toBe("pending");
  });

  it("should resolve a promise", async () => {
    const wp = new WatchablePromise<string>((resolve) => {
      resolve("foo");
    });
    await wp;
    expect(wp.settled).toBe(true);
    expect(wp.state).toBe("fulfilled");
    await expect(wp).resolves.toBe("foo");
  });

  it("should reject a promise", async () => {
    const wp = new WatchablePromise<string>((_, reject) => {
      reject("foo");
    });
    await wp.catch(() => {});
    expect(wp.settled).toBe(true);
    expect(wp.state).toBe("rejected");
    await expect(wp).rejects.toBe("foo");
  });

  it("should resolve a promise using withResolvers", async () => {
    const { promise, resolve } = WatchablePromise.withResolvers<string>();
    expect(promise.settled).toBe(false);
    expect(promise.state).toBe("pending");
    resolve("foo");
    await promise;
    expect(promise.settled).toBe(true);
    expect(promise.state).toBe("fulfilled");
    await expect(promise).resolves.toBe("foo");
  });

  it("should reject a promise using withResolvers", async () => {
    const { promise, reject } = WatchablePromise.withResolvers<string>();
    expect(promise.settled).toBe(false);
    expect(promise.state).toBe("pending");
    reject("foo");
    await promise.catch(() => {});
    expect(promise.settled).toBe(true);
    expect(promise.state).toBe("rejected");
    await expect(promise).rejects.toBe("foo");
  });
});
