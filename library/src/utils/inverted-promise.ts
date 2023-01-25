export function createInvertedPromise<T>(): [Promise<T>, (value: T) => void] {
    let resolve: (value: T) => void;
    const promise = new Promise<T>((res) => {
        resolve = res;
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return [promise, resolve!];
}
