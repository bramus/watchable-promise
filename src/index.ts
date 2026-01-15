class WatchablePromise<T> extends Promise<T> {
  #settled = false;
  #status: "pending" | "fulfilled" | "rejected" = "pending";

  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
    ) => void,
  ) {
    let resolve: (value: T | PromiseLike<T>) => void;
    let reject: (reason?: any) => void;

    super((res, rej) => {
      resolve = res;
      reject = rej;
    });

    this.then(
      () => {
        this.#status = "fulfilled";
        this.#settled = true;
      },
      () => {
        this.#status = "rejected";
        this.#settled = true;
      },
    );

    // @ts-ignore
    executor(resolve, reject);
  }

  get settled() {
    return this.#settled;
  }

  get status() {
    return this.#status;
  }

  static from<T>(existingPromise: Promise<T>): WatchablePromise<T> {
    return new WatchablePromise<T>((resolve, reject) => {
      existingPromise.then(resolve, reject);
    });
  }

  static withResolvers<T>() {
    let resolve: (value: T | PromiseLike<T>) => void;
    let reject: (reason?: any) => void;
    const promise = new WatchablePromise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    // @ts-ignore
    return { promise, resolve, reject };
  }

  static get [Symbol.species]() {
    return Promise;
  }

  get [Symbol.toStringTag]() {
    return "WatchablePromise";
  }
}

export default WatchablePromise;
