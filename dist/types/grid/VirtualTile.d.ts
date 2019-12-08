import * as React from 'react';
import { DocDir, ScrollEvent, SizeCallback } from '../types';
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
    top: number;
    left: number;
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
    private windowCalc;
    constructor(props: VirtualTileProps);
    scroll(e: ScrollEvent): void;
    getScrollableHeight(): number;
    getScrollableWidth(): number;
    clearCache(): void;
    render(): JSX.Element;
    private renderCells;
}
export {};
