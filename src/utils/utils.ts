
export function isNullOrUndefined(val: any): boolean {
    return val === null || val === undefined;
}

export function asArray<T>(val: T | T[]): T[] {
    if (Array.isArray(val))
        return val;

    return [val];
};