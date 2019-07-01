
export function isNullOrUndefined(val: any): boolean {
    return val === null || val === undefined;
}

export function asArray<T>(val: T | T[]): T[] {
    if (Array.isArray(val))
        return val;

    return [val];
}

export function randomInt(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function range(count: number): number[] {
    // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
    return [...Array(count || 0).keys()];
}