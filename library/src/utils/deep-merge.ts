/* eslint-disable @typescript-eslint/no-explicit-any */

// Derived from: https://github.com/voodoocreation/ts-deepmerge

type TAllKeys<T> = T extends any ? keyof T : never;

type TIndexValue<T, K extends PropertyKey, D = never> = T extends any
    ? K extends keyof T
        ? T[K]
        : D
    : never;

type TPartialKeys<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>> extends infer O
    ? { [P in keyof O]: O[P] }
    : never;

type TFunction = (...a: any[]) => any;

type TPrimitives =
    | string
    | number
    | boolean
    | bigint
    | symbol
    | Date
    | TFunction;

type TMerged<T> = [T] extends [Array<any>]
    ? { [K in keyof T]: TMerged<T[K]> }
    : [T] extends [TPrimitives]
    ? T
    : [T] extends [object]
    ? TPartialKeys<{ [K in TAllKeys<T>]: TMerged<TIndexValue<T, K>> }, never>
    : T;

function isObject(obj: any) {
    if (typeof obj === "object" && obj !== null) {
        if (typeof Object.getPrototypeOf === "function") {
            const prototype = Object.getPrototypeOf(obj);
            return prototype === Object.prototype || prototype === null;
        }
        return Object.prototype.toString.call(obj) === "[object Object]";
    }
    return false;
}

interface IObject {
    [key: string]: any;
}

export function merge<T extends IObject[]>(...objects: T): TMerged<T[number]> {
    return objects.reduce((result, current) => {
        if (!isObject(current)) {
            throw new TypeError("Arguments provided must be objects.");
        }
        Object.keys(current).forEach((key) => {
            if (["__proto__", "constructor", "prototype"].includes(key)) {
                return;
            }
            if (isObject(result[key]) && isObject(current[key])) {
                result[key] = merge(
                    result[key] as IObject,
                    current[key] as IObject
                );
            } else {
                result[key] = current[key];
            }
        });
        return result;
    }, {}) as any;
}
