
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

export function randomInt(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}