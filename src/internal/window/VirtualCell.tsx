import * as React from 'react';
import { DocDir } from '../../types';

export interface VirtualCellProps {
    /**
     * We are only using classes for easier debug inspection...
     */
    className: string;
    direction: DocDir;
    height: number;
    width: number;
    left: number;
    top: number;
    children: React.ReactNode;
}

/***
 * Each `VirtualWindow` creates a constant number of these `VirtualCell`s and just
 * moves them around. This is much more efficient than creating a new cell on
 * each scroll.
 *
 * based on:
 * https://github.com/Flipkart/recyclerlistview/blob/master/src/platform/web/viewrenderer/ViewRenderer.tsx
 */
export class VirtualCell extends React.PureComponent<VirtualCellProps> {
    public render(): React.ReactNode {

        const rightOrLeft = this.props.direction === 'rtl' ? 'right' : 'left';

        // https://rtl-css.net/tutorial/quick-tip-rtling-css3-transform-functions-translate-and-translatex
        const transformModifier = (this.props.direction === 'rtl') ? -1 : 1;
        const transform = `translate(${this.props.left * transformModifier}px,${this.props.top}px)`;

        return (
            <div
                className={this.props.className}
                style={{
                    boxSizing: 'border-box',
                    height: this.props.height,
                    width: this.props.width,
                    position: "absolute",
                    [rightOrLeft]: 0,
                    top: 0,
                    willChange: "transform",
                    transform
                }}
            >
                {this.props.children}
            </div>
        );
    }
}