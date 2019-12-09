/// <reference types="react" />
import { DocDir } from '../types';
export interface NormalizedScrollEvent {
    scrollTop: number;
    rawScrollLeft: number;
    normalizedScrollLeft: number;
}
export declare class ScrollUtils {
    static normalizeScrollEvent(e: React.UIEvent<HTMLElement>, docDir: DocDir): NormalizedScrollEvent;
}
