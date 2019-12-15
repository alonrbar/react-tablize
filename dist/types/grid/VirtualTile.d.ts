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
    controlledScroll?: boolean;
    height: number;
    width: number;
    columnCount: number;
    rowCount: number;
    columnWidth: number | SizeCallback;
    rowHeight: number | SizeCallback;
    estimatedColumnWidth?: number;
    estimatedRowHeight?: number;
    overscanColumnsCount?: number;
    overscanRowCount?: number;
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
    private minColumnsToRender;
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
