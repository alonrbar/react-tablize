export declare type RtlOffsetType = 'negative' | 'positive-descending' | 'positive-ascending';
export declare class DomUtils {
    static get scrollbarWidth(): number;
    static get rtlOffsetType(): RtlOffsetType;
    private static _scrollbarWidth;
    private static _rtlOffsetType;
}
