export type RtlOffsetType = 'negative' | 'positive-descending' | 'positive-ascending';

export class DomUtils {

    public static get scrollbarWidth(): number {
        if (this._scrollbarWidth !== null)
            return this._scrollbarWidth;

        // https://github.com/sonicdoe/measure-scrollbar/blob/master/index.js

        const div = document.createElement('div');

        div.style.width = '100px';
        div.style.height = '100px';
        div.style.overflow = 'scroll';
        div.style.position = 'absolute';
        div.style.top = '-9999px';

        document.body.appendChild(div);

        this._scrollbarWidth = div.offsetWidth - div.clientWidth;

        document.body.removeChild(div);

        return this._scrollbarWidth;
    }

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
    public static get rtlOffsetType(): RtlOffsetType {
        if (DomUtils._rtlOffsetType)
            return DomUtils._rtlOffsetType;

        const outerDiv = document.createElement('div');
        const outerStyle = outerDiv.style;
        outerStyle.width = '50px';
        outerStyle.height = '50px';
        outerStyle.overflow = 'scroll';
        outerStyle.direction = 'rtl';

        const innerDiv = document.createElement('div');
        const innerStyle = innerDiv.style;
        innerStyle.width = '100px';
        innerStyle.height = '100px';

        outerDiv.appendChild(innerDiv);

        document.body.appendChild(outerDiv);

        if (outerDiv.scrollLeft > 0) {
            DomUtils._rtlOffsetType = 'positive-descending';
        } else {
            outerDiv.scrollLeft = 1;
            if (outerDiv.scrollLeft === 0) {
                DomUtils._rtlOffsetType = 'negative';
            } else {
                DomUtils._rtlOffsetType = 'positive-ascending';
            }
        }

        document.body.removeChild(outerDiv);

        return DomUtils._rtlOffsetType;
    }

    public static get isPositionStickySupported(): boolean {

        // https://github.com/dollarshaveclub/stickybits/issues/35#issuecomment-549929578

        if (DomUtils._isPositionStickySupported !== null)
            return DomUtils._isPositionStickySupported;

        const prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
        const testElementStyle = document.head.style;

        for (let i = 0; i < prefix.length; i += 1) {
            testElementStyle.position = `${prefix[i]}sticky`;
        }
        DomUtils._isPositionStickySupported = (testElementStyle.position === 'sticky');

        return DomUtils._isPositionStickySupported;
    }

    private static _scrollbarWidth: number = null;

    private static _rtlOffsetType: RtlOffsetType;

    private static _isPositionStickySupported: boolean = null;
}