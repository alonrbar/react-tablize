import * as React from 'react';
import { DocDir, ScrollDirection, SizeCallback } from '../types';
import { NormalizedScrollEvent } from '../utils';
export interface RenderTileCellProps {
    colIndex: number;
    rowIndex: number;
    height: number;
    width: number;
}
export declare class VirtualTileProps {
    direction?: DocDir;
    /**
     * Allow scrolling only via calling the `scrollTo` method.
     */
    controlledScroll?: boolean;
    height: number;
    width: number;
    columnCount: number;
    rowCount: number;
    columnWidth: number | SizeCallback;
    rowHeight: number | SizeCallback;
    /**
     * If `columnWidth` is a function and this prop is not specified will use
     * eager evaluation (invoke the method for all cells on component mount) to
     * calculate the total scroll width.
     */
    estimatedColumnWidth?: number;
    /**
     * If `rowHeight` is a function and this prop is not specified will use
     * eager evaluation (invoke the method for all cells on component mount) to
     * calculate the total scroll height.
     */
    estimatedRowHeight?: number;
    overscanColumnsCount?: number;
    overscanRowCount?: number;
    /**
     * We are only using classes for easier debug inspection...
     */
    className?: string;
    style?: React.CSSProperties;
    children: (props: RenderTileCellProps) => React.ReactNode;
}
declare class VirtualTileState {
    scrollTop: number;
    scrollLeft: number;
}
export declare class VirtualTile extends React.PureComponent<VirtualTileProps, VirtualTileState> {
    static defaultProps: unknown;
    /**
     * Make sure to return a constant number of elements, this is important for
     * recycling purposes.
     */
    private minColumnsToRender;
    /**
     * Make sure to return a constant number of elements, this is important for
     * recycling purposes.
     */
    private minRowsToRender;
    private windowCalc;
    private recycler;
    private containerElement;
    constructor(props: VirtualTileProps);
    scrollTo(e: NormalizedScrollEvent, scrollDirection?: ScrollDirection): void;
    getScrollableHeight(): number;
    getScrollableWidth(): number;
    clearCache(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: VirtualTileProps): void;
    render(): JSX.Element;
    private renderCells;
    private renderCell;
    private handleScroll;
    private getCellOriginalKey;
}
export {};
