import { describe, it, expect } from "vitest";
import WatchablePromise from "../src/index";

describe("WatchablePromise Static Methods", () => {
  describe("resolve", () => {
    it("should create a resolved promise with WatchablePromise.resolve()", async () => {
      const wp = WatchablePromise.resolve("foo");
      await wp;
      expect(wp.settled).toBe(true);
      expect(wp.state).toBe("fulfilled");
      expect(wp.value).toBe("foo");
      await expect(wp).resolves.toBe("foo");
    });
  });

  describe("reject", () => {
    it("should create a rejected promise with WatchablePromise.reject()", async () => {
      const wp = WatchablePromise.reject("foo");
      await wp.catch(() => {});
      expect(wp.settled).toBe(true);
      expect(wp.state).toBe("rejected");
      expect(wp.value).toBe("foo");
      await expect(wp).rejects.toBe("foo");
    });
  });

  describe("from", () => {
    it("should return a WatchablePromise", () => {
      const p = Promise.resolve("foo");
      const wp = WatchablePromise.from(p);
      expect(wp).toBeInstanceOf(WatchablePromise);
    });

    it("should handle a resolving promise", async () => {
      const p = Promise.resolve("foo");
      const wp = WatchablePromise.from(p);
      await wp;
      expect(wp.settled).toBe(true);
      expect(wp.state).toBe("fulfilled");
      expect(wp.value).toBe("foo");
      await expect(wp).resolves.toBe("foo");
    });

    it("should handle a rejecting promise", async () => {
      const p = Promise.reject("foo");
      const wp = WatchablePromise.from(p);
      await wp.catch(() => {});
      expect(wp.settled).toBe(true);
      expect(wp.state).toBe("rejected");
      expect(wp.value).toBe("foo");
      await expect(wp).rejects.toBe("foo");
    });

    it("should be pending if the original promise is pending", () => {
      const p = new Promise(() => {});
      const wp = WatchablePromise.from(p);
      expect(wp.settled).toBe(false);
      expect(wp.state).toBe("pending");
      expect(wp.value).toBe(undefined);
    });

    it("should resolve when the original promise resolves", async () => {
      const p = new Promise((resolve) => {
        setTimeout(() => resolve("foo"), 100);
      });
      const wp = WatchablePromise.from(p);
      expect(wp.settled).toBe(false);
      expect(wp.state).toBe("pending");
      expect(wp.value).toBe(undefined);
      await wp;
      expect(wp.settled).toBe(true);
      expect(wp.state).toBe("fulfilled");
      expect(wp.value).toBe("foo");
    });

    it("should reject when the original promise rejects", async () => {
      const p = new Promise((_, reject) => {
        setTimeout(() => reject("foo"), 100);
      });
      const wp = WatchablePromise.from(p);
      expect(wp.settled).toBe(false);
      expect(wp.state).toBe("pending");
      expect(wp.value).toBe(undefined);
      await wp.catch(() => {});
      expect(wp.settled).toBe(true);
      expect(wp.state).toBe("rejected");
      expect(wp.value).toBe("foo");
    });

    it("should resolve a pre-resolved promise", async () => {
      const p = Promise.resolve("foo");
      const wp = WatchablePromise.from(p);
      await wp;
      expect(wp.settled).toBe(true);
      expect(wp.state).toBe("fulfilled");
      expect(wp.value).toBe("foo");
    });

    it("should reject pre-rejected promise", async () => {
      const p = Promise.reject("foo");
      const wp = WatchablePromise.from(p);
      await wp.catch(() => {});
      expect(wp.settled).toBe(true);
      expect(wp.state).toBe("rejected");
      expect(wp.value).toBe("foo");
    });
  });
});
