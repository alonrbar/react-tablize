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
export declare class VirtualCell extends React.PureComponent<VirtualCellProps> {
    render(): JSX.Element;
}
