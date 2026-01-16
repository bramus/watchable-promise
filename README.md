# watchable-promise

A Promise whose state and value you can read

## Installation

```bash
npm install watchable-promise
```

## Usage

- Directly create a `WatchablePromise` instance:

    ```javascript
    import WatchablePromise from "watchable-promise";

    const p = new WatchablePromise(resolve => setTimeout(() => resolve("foo"), 100));

    console.log(p.state); // pending
    console.log(p.settled); // false
    console.log(p.value); // undefined

    const val = await p;

    console.log(val) // "foo"
    console.log(p.state); // fulfilled
    console.log(p.settled); // true
    console.log(p.value); // "foo"
    ```

- Using an existing `Promise` instance:

    ```javascript
    import WatchablePromise from 'watchable-promise';

    const existingPromise = new Promise(resolve => setTimeout(() => resolve("foo"), 100));
    const p = WatchablePromise.from(existingPromise);

    console.log(p.state); // pending
    console.log(p.settled); // false
    console.log(p.value); // undefined

    const val = await p;

    console.log(val) // "foo"
    console.log(p.state); // fulfilled
    console.log(p.settled); // true
    console.log(p.value); // "foo"
    ```

- Using `WatchablePromise.withResolvers()`:

    ```javascript
    import WatchablePromise from 'watchable-promise';
    
    const { promise, resolve, reject } = WatchablePromise.withResolvers();

    console.log(promise.state); // pending
    console.log(promise.settled); // false
    console.log(promise.value); // undefined
    
    await resolve("foo");

    console.log(promise.state); // fulfilled
    console.log(promise.settled); // true
    console.log(promise.value); // "foo"
    ```

- You can call `.resolve()` or `.reject()` on a `WatchablePromise` instance to resolve or reject it externally:

    ```javascript
    import WatchablePromise from "watchable-promise";

    // Resolving
    const p1 = new WatchablePromise(resolve => {});
    p1.resolve("foo");
    const val = await p1;
    console.log(val) // "foo"

    // Rejecting
    const p2 = new WatchablePromise((resolve, reject) => {});
    p2.reject("bar");
    try {
        await p2;
    } catch (err) {
        console.log(err) // "bar"
    }
    ```

## License

`watchable-promise` is released under the Apache 2.0 License. See the enclosed [`LICENSE`](./LICENSE) for details.

## Disclaimer

This is not an officially supported Google product. I just happen to work there.
