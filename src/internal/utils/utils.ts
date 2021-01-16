
export function isNullOrUndefined(val: unknown): boolean {
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

export function areShallowEqual(a: unknown, b: unknown): boolean {
    if (a === b) {
        return true;
    }

    if (a === null || a === undefined || b === null || b === undefined) {
        return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (const key of keysA) {
        if ((a as any)[key] !== (b as any)[key])
            return false;
    }

    return true;
}