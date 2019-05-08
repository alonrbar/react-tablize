
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

export function getHeights(style: React.CSSProperties, defaultHeight: number | string): Heights {
    style = style || {};

    let height = style.height;
    let minHeight = style.minHeight;
    let maxHeight = style.maxHeight;

    if (height === undefined && minHeight === undefined) {
        height = defaultHeight;
    }

    height = cssSizeString(height);
    minHeight = cssSizeString(minHeight);
    maxHeight = cssSizeString(maxHeight);

    return {
        height,
        minHeight,
        maxHeight
    };
}

export function randomInt(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function range(count: number): number[] {
    // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
    return [...Array(count || 0).keys()];
}