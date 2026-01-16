# watchable-promise

A Promise whose state you can read

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

    const val = await p;

    console.log(val) // "foo"
    console.log(p.state); // fulfilled
    console.log(p.settled); // true
    ```

- Using an existing `Promise` instance:

    ```javascript
    import WatchablePromise from 'watchable-promise';

    const existingPromise = new Promise(resolve => setTimeout(() => resolve("foo"), 100));
    const p = WatchablePromise.from(existingPromise);

    console.log(p.state); // pending
    console.log(p.settled); // false

    const val = await p;

    console.log(val) // "foo"
    console.log(p.state); // fulfilled
    console.log(p.settled); // true
    ```

- Using `WatchablePromise.withResolvers()`:

    ```javascript
    import WatchablePromise from 'watchable-promise';
    
    const { promise, resolve, reject } = WatchablePromise.withResolvers();

    console.log(promise.state); // pending
    console.log(promise.settled); // false
    
    await resolve("foo");

    console.log(promise.state); // fulfilled
    console.log(promise.settled); // true
    ```

## License

`watchable-promise` is released under the Apache 2.0 License. See the enclosed [`LICENSE`](./LICENSE) for details.

## Disclaimer

This is not an officially supported Google product. I just happen to work there.
