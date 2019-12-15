/// <reference types="react" />
import { DocDir } from '../types';
export interface NormalizedScrollEvent {
    scrollTop: number;
    /**
     * The original scrollLeft value as it was sent by the browser.
     */
    rawScrollLeft: number;
    /**
     * The normalized, "positive-ascending" scrollLeft value.
     * For mode details see the comment on `DomUtils.rtlOffsetType`.
     */
    normalizedScrollLeft: number;
}
export declare class ScrollUtils {
    static normalizeScrollEvent(e: React.UIEvent<HTMLElement>, docDir: DocDir): NormalizedScrollEvent;
}
