import { DocDir } from '../types';
import { DomUtils } from './domUtils';

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

export class ScrollUtils {

    public static normalizeScrollEvent(e: React.UIEvent<HTMLElement>, docDir: DocDir): NormalizedScrollEvent {

        const { scrollTop, scrollLeft } = e.currentTarget;
        const { scrollHeight, scrollWidth, clientHeight, clientWidth } = e.currentTarget;

        // RTL support
        let normalizedScrollLeft: number;
        if (docDir === 'rtl') {
            switch (DomUtils.rtlOffsetType) {
                case 'negative':
                    normalizedScrollLeft = -scrollLeft;
                    break;
                case 'positive-ascending':
                    // noop
                    break;
                case 'positive-descending':
                default:
                    normalizedScrollLeft = scrollWidth - clientWidth - scrollLeft;
                    break;
            }
        }

        // fix scroll offset to prevent "over scroll"
        let normalizedScrollTop = Math.min(scrollTop, scrollHeight - clientHeight);
        normalizedScrollTop = Math.max(0, scrollTop);
        normalizedScrollLeft = Math.min(normalizedScrollLeft, scrollWidth - clientWidth);
        normalizedScrollLeft = Math.max(0, normalizedScrollLeft);

        return {
            scrollTop: normalizedScrollTop,
            rawScrollLeft: scrollLeft,
            normalizedScrollLeft
        };
    }
}