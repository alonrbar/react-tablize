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
export declare type TileVerticalPosition = 'header' | 'body' | 'footer';
export declare type TileHorizontalPosition = 'left' | 'center' | 'right';
export interface TilePosition {
    vertical: TileVerticalPosition;
    horizontal: TileHorizontalPosition;
}
export interface RenderCellProps {
    /**
     * Absolute column index, taking into account fixed columns.
     */
    absColIndex: number;
    /**
     * Absolute row index, taking into account fixed header and/or footer.
     */
    absRowIndex: number;
    /**
     * Column index relative to the current tile.
     */
    relColIndex: number;
    /**
     * Row index relative to the current tile.
     */
    relRowIndex: number;
    tileKey: TileKey;
    tilePosition: TilePosition;
    /**
     * The height of the rendered cell.
     * You don't have to do anything with it, it's just an informative prop.
     */
    height: number;
    /**
     * The width of the rendered cell.
     * You don't have to do anything with it, it's just an informative prop.
     */
    width: number;
}
declare class GridState {
    scrollTop: number;
    normalizedScrollLeft: number;
    rawScrollLeft: number;
}
export declare class GridProps {
    /**
     * Number of columns in the grid, excluding fixed columns.
     */
    columnCount: number;
    /**
     * Number of rows in the grid, excluding the header and footer.
     */
    rowCount: number;
    columnWidth: number | SizeCallback;
    rowHeight: number | SizeCallback;
    overscanColumnsCount?: number;
    overscanRowCount?: number;
    fixedHeaderHeight?: number;
    fixedFooterHeight?: number;
    fixedLeftWidth?: number;
    fixedRightWidth?: number;
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onScroll?: (e: ScrollEvent) => void;
    children: (props: RenderCellProps) => React.ReactNode;
}
export declare class Grid extends React.PureComponent<GridProps, GridState> {
    static readonly defaultHeight = "35vh";
    static defaultProps: unknown;
    private get direction();
    private get activeTiles();
    private width;
    private height;
    private tiles;
    private initialCalculator;
    constructor(props: GridProps);
    refresh(): void;
    componentDidUpdate(prevProps: GridProps): void;
    render(): JSX.Element;
    private renderGrid;
    private renderTilesRow;
    private renderTile;
    private handleScroll;
    private getTilesInRow;
    private createTilesMap;
    private createTileMapEntryFactory;
    private getTilePosition;
    private resetTiles;
    private getContainerHeight;
    private getContainerWidth;
    private getScrollableHeight;
    private getScrollableWidth;
    private getBodyScrollableHeight;
    private getBodyScrollableWidth;
    private getVerticalScrollbarWidth;
    private getHorizontalScrollbarWidth;
    /**
     * We are only using classes for easier debug inspection...
     */
    private createClassName;
}
export {};
