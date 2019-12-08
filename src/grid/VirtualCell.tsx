import * as React from 'react';
import { DocDir } from '../types';

// inspired by: https://github.com/Flipkart/recyclerlistview/blob/master/src/platform/web/viewrenderer/ViewRenderer.tsx

export interface VirtualCellProps {
    height: number;
    direction: DocDir;
    width: number;
    left: number;
    top: number;
    children: React.ReactNode;
}

export class VirtualCell extends React.PureComponent<VirtualCellProps> {
    public render() {

        const rightOrLeft = this.props.direction === 'rtl' ? 'right' : 'left';

        // https://rtl-css.net/tutorial/quick-tip-rtling-css3-transform-functions-translate-and-translatex
        const transformModifier = (this.props.direction === 'rtl') ? -1 : 1;
        const transform = `translate(${this.props.left * transformModifier}px,${this.props.top}px)`;

        return (
            <div
                style={{
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