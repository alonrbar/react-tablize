import * as React from 'react';
import { ScrollEvent, SizeCallback } from '../../types';

export enum TileKey {
    HeaderLeft = 'Header_Left',
    HeaderCenter = 'Header_Center',
    HeaderRight = 'Header_Right',
    BodyLeft = 'Body_Left',
    BodyCenter = 'Body_Center',
    BodyRight = 'Body_Right',
    FooterLeft = 'Footer_Left',
    FooterCenter = 'Footer_Center',
    FooterRight = 'Footer_Right'
}

export interface TilePosition {
    vertical: 'header' | 'body' | 'footer';
    horizontal: 'left' | 'center' | 'right';
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

export class VirtualGridProps {

    public onScroll?: (e: ScrollEvent) => void;

    public height: number;
    public width: number;
    /**
     * Number of columns in the grid, excluding fixed columns.
     */
    public columnCount: number;
    /**
     * Number of rows in the grid, excluding the header and footer.
     */
    public rowCount: number;
    public columnWidth: number | SizeCallback;
    public rowHeight: number | SizeCallback;
    public overscanColumnsCount?= 0;
    public overscanRowCount?= 0;

    public fixedHeaderHeight?= 0;
    public fixedFooterHeight?= 0;
    public fixedLeftWidth?= 0;
    public fixedRightWidth?= 0;

    public style?: React.CSSProperties;

    public children: (props: RenderCellProps) => React.ReactNode;
}