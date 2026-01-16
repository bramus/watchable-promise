class WatchablePromise<T> extends Promise<T> {
  #settled = false;
  #state: "pending" | "fulfilled" | "rejected" = "pending";
  #value: T | any;
  #resolve: (value: T | PromiseLike<T>) => void;
  #reject: (reason?: any) => void;

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

    // @ts-ignore
    this.#resolve = resolve;
    // @ts-ignore
    this.#reject = reject;

    this.then(
      (value) => {
        this.#state = "fulfilled";
        this.#value = value;
        this.#settled = true;
      },
      (reason) => {
        this.#state = "rejected";
        this.#value = reason;
        this.#settled = true;
      },
    );

    executor(this.#resolve, this.#reject);
  }

  resolve(value: T) {
    this.#resolve(value);
  }

  reject(reason?: any) {
    this.#reject(reason);
  }

  get settled() {
    return this.#settled;
  }

  get state() {
    return this.#state;
  }

  get value() {
    return this.#value;
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
