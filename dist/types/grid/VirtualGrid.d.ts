import * as React from 'react';
import { ScrollEvent, SizeCallback } from '../types';
export declare enum TileKey {
    HeaderLeft = "Header_Left",
    HeaderCenter = "Header_Center",
    HeaderRight = "Header_Right",
    BodyLeft = "Body_Left",
    BodyCenter = "Body_Center",
    BodyRight = "Body_Right",
    FooterLeft = "Footer_Left",
    FooterCenter = "Footer_Center",
    FooterRight = "Footer_Right"
}
export interface TilePosition {
    vertical: 'header' | 'body' | 'footer';
    horizontal: 'left' | 'center' | 'right';
}
export interface RenderCellProps {
    absColIndex: number;
    absRowIndex: number;
    relColIndex: number;
    relRowIndex: number;
    tileKey: TileKey;
    tilePosition: TilePosition;
    height: number;
    width: number;
}
export declare class VirtualGridProps {
    onScroll?: (e: ScrollEvent) => void;
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
    fixedHeaderHeight?: number;
    fixedFooterHeight?: number;
    fixedLeftWidth?: number;
    fixedRightWidth?: number;
    style?: React.CSSProperties;
    tileStyle?: (tileKey: TileKey) => React.CSSProperties;
    children: (props: RenderCellProps) => React.ReactNode;
}
declare class VirtualGridState {
    scrollTop: number;
    scrollLeft: number;
}
export declare class VirtualGrid extends React.PureComponent<VirtualGridProps, VirtualGridState> {
    static defaultProps: unknown;
    private get direction();
    private get activeTiles();
    private get headerTiles();
    private get bodyTiles();
    private get footerTiles();
    private tiles;
    constructor(props: VirtualGridProps);
    componentDidUpdate(prevProps: VirtualGridProps): void;
    render(): JSX.Element;
    private renderTilesRow;
    private renderTile;
    private handleScroll;
    private createTilesMap;
    private createTileMapEntryFactory;
    private getTilePosition;
    private getScrollableAreaHeight;
    private getBodyScrollableHeight;
    private getScrollableAreaWidth;
    private getBodyScrollableAreaWidth;
    private getVerticalScrollbarWidth;
    private getHorizontalScrollbarWidth;
    private getContainerHeight;
    private getContainerWidth;
    private createClassName;
    private resetTiles;
}
export {};
