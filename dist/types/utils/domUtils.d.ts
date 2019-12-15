export declare type RtlOffsetType = 'negative' | 'positive-descending' | 'positive-ascending';
export declare class DomUtils {
    static get scrollbarWidth(): number;
    /**
     * TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
     * Chrome does not seem to adhere; its scrollLeft values are positive (measured relative to the left).
     * Safari's elastic bounce makes detecting this even more complicated wrt potential false positives.
     * The safest way to check this is to intentionally set a negative offset,
     * and then verify that the subsequent "scroll" event matches the negative offset.
     * If it does not match, then we can assume a non-standard RTL scroll implementation.
     *
     * From: https://github.com/bvaughn/react-window/blob/master/src/domHelpers.js
     */
    static get rtlOffsetType(): RtlOffsetType;
    static get isPositionStickySupported(): boolean;
    private static _scrollbarWidth;
    private static _rtlOffsetType;
    private static _isPositionStickySupported;
}
