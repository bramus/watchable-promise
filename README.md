# watchable-promise

A Promise whose status you can read

## Installation

```bash
npm install watchable-promise
```

## Usage

- Directly create a `WatchablePromise` instance:

    ```javascript
    import WatchablePromise from 'watchable-promise';

    const p = new WatchablePromise(…);

    console.log(p.status); // pending
    console.log(p.settled); // false
    ```

- Using an existing `Promise` instance:

    ```javascript
    import WatchablePromise from 'watchable-promise';

    const existingPromise = new Promise(resolve => setTimeout(() => resolve('foo'), 100));
    const p = WatchablePromise.from(existingPromise);

    console.log(p.status); // pending
    console.log(p.settled); // false

    p.then(val => {
        console.log(val) // 'bar'
        console.log(p.status); // fulfilled
        console.log(p.settled); // true
    });
    ```

- Using `WatchablePromise.withResolvers()`:

    ```javascript
    import WatchablePromise from 'watchable-promise';
    
    const { promise, resolve, reject } = WatchablePromise.withResolvers();

    console.log(promise.status); // pending
    console.log(promise.settled); // false
    
    resolve('bar');

    promise.then(val => {
        console.log(val) // 'bar'
        console.log(promise.status); // fulfilled
        console.log(promise.settled); // true
    });
    ```

## License

`watchable-promise` is released under the Apache 2.0 License. See the enclosed [`LICENSE`](./LICENSE) for details.

## Disclaimer

This is not an officially supported Google product. I just happen to work there.
