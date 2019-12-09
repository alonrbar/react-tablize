export declare type RtlOffsetType = 'negative' | 'positive-descending' | 'positive-ascending';
export declare class DomUtils {
    static get scrollbarWidth(): number;
    static get rtlOffsetType(): RtlOffsetType;
    static get isPositionStickySupported(): boolean;
    private static _scrollbarWidth;
    private static _rtlOffsetType;
    private static _isPositionStickySupported;
}
