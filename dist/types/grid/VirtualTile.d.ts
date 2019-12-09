import * as React from 'react';
import { DocDir, SizeCallback } from '../types';
import { NormalizedScrollEvent } from '../utils';
export declare type Scrollability = 'vertical' | 'horizontal' | 'none' | 'both';
export interface RenderTileCellProps {
    colIndex: number;
    rowIndex: number;
    height: number;
    width: number;
}
export interface VirtualTileProps {
    scrollability: Scrollability;
    direction: DocDir;
    height: number;
    width: number;
    position: 'absolute' | 'sticky';
    top: number;
    left: number;
    float: 'right' | 'left';
    columnCount: number;
    rowCount: number;
    estimatedColumnWidth: number;
    estimatedRowHeight: number;
    columnWidth?: SizeCallback;
    rowHeight?: SizeCallback;
    overscanColumnsCount?: number;
    overscanRowCount?: number;
    className: string;
    children: (props: RenderTileCellProps) => React.ReactNode;
}
declare class VirtualTileState {
    scrollTop: number;
    scrollLeft: number;
}
export declare class VirtualTile extends React.PureComponent<VirtualTileProps, VirtualTileState> {
    private minColumnsToRender;
    private minRowsToRender;
    private windowCalc;
    private recycler;
    private containerElement;
    constructor(props: VirtualTileProps);
    scroll(e: NormalizedScrollEvent): void;
    getScrollableHeight(): number;
    getScrollableWidth(): number;
    clearCache(): void;
    render(): JSX.Element;
    private renderCells;
    private renderCell;
    private getCellOriginalKey;
}
export {};
