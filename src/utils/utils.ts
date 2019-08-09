
export function isNullOrUndefined(val: any): boolean {
    return val === null || val === undefined;
}

export function asArray<T>(val: T | T[]): T[] {
    if (Array.isArray(val))
        return val;

    return [val];
}

export function range(count: number): number[] {
    // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
    return [...Array(count || 0).keys()];
}