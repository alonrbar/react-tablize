
export function isNullOrUndefined(val: any): boolean {
    return val === null || val === undefined;
}

export function asArray<T>(val: T | T[]): T[] {
    if (Array.isArray(val))
        return val;

    return [val];
}

export function cssSizeString(size: any): string {
    if (Number.isFinite(size))
        return size + 'px';
    return size;
}