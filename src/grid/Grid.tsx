import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ErrorBoundary } from '../internal/ErrorBoundary';
import { areShallowEqual, DomUtils, ScrollUtils, SizeUtils } from '../internal/utils';
import { VirtualWindow, VirtualWindowProps, WindowCalculator } from '../internal/window';
import { DocDir, ScrollEvent, SizeCallback } from '../types';

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

export type TileVerticalPosition = 'header' | 'body' | 'footer';
export type TileHorizontalPosition = 'left' | 'center' | 'right';

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

interface TileEntry {
    ref: React.RefObject<VirtualWindow>;
    position: TilePosition;
    tileRowTop: number;
    rowIndexOffset: number;
    columnIndexOffset: number;
    props: Omit<VirtualWindowProps, "children">;
}

type TilesMap = {
    [key in TileKey]: TileEntry
};

class GridState {
    public scrollTop = 0;
    public normalizedScrollLeft = 0;
    public rawScrollLeft: number;
}

export class GridProps {

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
    public className?: string;

    public onClick?: React.MouseEventHandler<HTMLElement>;
    public onScroll?: (e: ScrollEvent) => void;

    public children: (props: RenderCellProps) => React.ReactNode;
}

export class Grid extends React.PureComponent<GridProps, GridState> {

    public static readonly defaultHeight = '35vh';

    public static defaultProps: unknown = new GridProps();

    private get direction(): DocDir {
        return this.props.style?.direction === 'rtl' ? 'rtl' : 'ltr';
    }

    private get activeTiles(): TileKey[] {
        return Object.keys(this.tiles) as TileKey[];
    }

    private width = 0;
    private height = 0;

    private tiles: Partial<TilesMap> = {};

    private initialCalculator = new WindowCalculator();

    private prevProps: GridProps;

    constructor(props: GridProps) {
        super(props);
        this.state = new GridState();
        this.tiles = this.createTilesMap();
    }

    public refresh() {
        this.clearCache();
        this.forceUpdate();
    }

    //
    // render methods
    //

    public render() {

        if (!areShallowEqual(this.props, this.prevProps)) {
            this.prevProps = this.props;
            this.clearCache();
        }

        return (
            <ErrorBoundary>
                <div
                    className={this.props.className}
                    style={{
                        direction: this.direction,
                        width: '100%',
                        ...this.props.style,
                        ...SizeUtils.getElementHeights(this, Grid.defaultHeight)
                    }}
                    onClick={this.props.onClick}
                >
                    <AutoSizer>
                        {({ width, height }) => this.renderGrid(width, height)}
                    </AutoSizer>
                </div>
            </ErrorBoundary >
        );
    }

    private renderGrid(width: number, height: number) {

        // assign width and height
        if (this.width !== width || this.height !== height) {
            setTimeout(() => this.refresh(), 0);
        }
        this.width = width;
        this.height = height;

        // render
        return (
            <div
                className={this.createClassName('Main_Container')}
                style={{
                    direction: this.direction,
                    position: 'relative',
                    height: this.getContainerHeight(),
                    width: this.getContainerWidth(),
                    overflow: 'auto',
                    ...this.props.style
                }}
                onScroll={this.handleScroll}
            >
                <div
                    className={this.createClassName('Main_ScrollableArea')}
                    style={{
                        height: this.getScrollableHeight(),
                        width: this.getScrollableWidth()
                    }}
                >
                    {this.renderTilesRow('header')}
                    {this.renderTilesRow('body')}
                    {this.renderTilesRow('footer')}
                </div>
            </div>
        );
    }

    private renderTilesRow(rowKey: TileVerticalPosition) {
        const tileKeys = this.getTilesInRow(rowKey);
        if (!tileKeys?.length)
            return null;

        const firstTile = this.tiles[tileKeys[0]];

        const isRtl = this.direction === 'rtl';
        const rightOrLeft = isRtl ? 'right' : 'left';

        const isSticky = DomUtils.isPositionStickySupported;
        const position = isSticky ? 'sticky' : 'absolute';
        const topOffset = (isSticky ? 0 : this.state.scrollTop);
        const leftOffset = (isSticky ? 0 : this.state.normalizedScrollLeft);

        const width = tileKeys
            .map(key => this.tiles[key].props.width)
            .reduce((total, cur) => total + cur, 0);

        // https://stackoverflow.com/questions/58578298/position-sticky-with-direction-rtl-not-working
        const marginLeft = (isSticky && isRtl ?
            (this.state.rawScrollLeft ?? (this.getScrollableWidth() - width)) :
            0);

        return (
            <div
                className={this.createClassName('TilesRow')}
                style={{
                    display: 'flex',
                    position,
                    top: firstTile.tileRowTop + topOffset,
                    [rightOrLeft]: 0 + leftOffset,
                    marginLeft,
                    height: firstTile.props.height,
                    width
                }}
            >
                {tileKeys.map(this.renderTile)}
            </div>
        );
    }

    private renderTile = (tileKey: TileKey): React.ReactNode => {
        const { ref, props, rowIndexOffset, columnIndexOffset } = this.tiles[tileKey];
        return (
            <VirtualWindow
                key={tileKey}
                ref={ref}
                {...props}
            >
                {renderProps => this.props.children({
                    tileKey,
                    tilePosition: this.getTilePosition(tileKey),
                    absRowIndex: renderProps.rowIndex + rowIndexOffset,
                    absColIndex: renderProps.colIndex + columnIndexOffset,
                    relRowIndex: renderProps.rowIndex,
                    relColIndex: renderProps.colIndex,
                    height: renderProps.height,
                    width: renderProps.width
                })}
            </VirtualWindow>
        );
    };

    //
    // event handlers
    //

    private handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
        const normalized = ScrollUtils.normalizeScrollEvent(e, this.direction);
        const isRtl = this.direction === 'rtl';

        if (!DomUtils.isPositionStickySupported || isRtl) {

            // Need to restore tiles position
            this.setState({
                scrollTop: normalized.scrollTop,
                normalizedScrollLeft: normalized.normalizedScrollLeft,
                rawScrollLeft: normalized.rawScrollLeft
            });
        }

        // Scroll tiles content
        for (const tileKey of this.activeTiles) {
            const { ref } = this.tiles[tileKey];
            ref.current.scrollTo(normalized);
        }

        this.props.onScroll(e);
    };

    //
    // render helpers
    //

    private clearCache() {
        this.initialCalculator = new WindowCalculator();
        this.tiles = this.createTilesMap();
    }

    private getTilesInRow(rowKey: TileVerticalPosition): TileKey[] {
        return this.activeTiles.filter(key => this.tiles[key].position.vertical === rowKey);
    }

    private createTilesMap(): Partial<TilesMap> {
        this.resetTiles();

        const map: Partial<TilesMap> = {};

        const hasHeader = !!this.props.fixedHeaderHeight;
        const hasFooter = !!this.props.fixedFooterHeight;
        const hasFixedLeftColumn = !!this.props.fixedLeftWidth;
        const hasFixedRightColumn = !!this.props.fixedRightWidth;

        const createTilesMapEntry = this.createTileMapEntryFactory();

        // header

        if (hasHeader) {

            if (hasFixedLeftColumn) {
                map[TileKey.HeaderLeft] = createTilesMapEntry(TileKey.HeaderLeft);
            }

            map[TileKey.HeaderCenter] = createTilesMapEntry(TileKey.HeaderCenter);

            if (hasFixedRightColumn) {
                map[TileKey.HeaderRight] = createTilesMapEntry(TileKey.HeaderRight);
            }
        }

        // body

        if (hasFixedLeftColumn) {
            map[TileKey.BodyLeft] = createTilesMapEntry(TileKey.BodyLeft);
        }

        map[TileKey.BodyCenter] = createTilesMapEntry(TileKey.BodyCenter);

        if (hasFixedRightColumn) {
            map[TileKey.BodyRight] = createTilesMapEntry(TileKey.BodyRight);
        }

        // footer

        if (hasFooter) {

            if (hasFixedLeftColumn) {
                map[TileKey.FooterLeft] = createTilesMapEntry(TileKey.FooterLeft);
            }

            map[TileKey.FooterCenter] = createTilesMapEntry(TileKey.FooterCenter);

            if (hasFixedRightColumn) {
                map[TileKey.FooterRight] = createTilesMapEntry(TileKey.FooterRight);
            }
        }

        return map;
    }

    private createTileMapEntryFactory() {

        // calculate base dimensions

        const horizontalScrollbarWidth = this.getHorizontalScrollbarWidth();
        const verticalScrollbarWidth = this.getVerticalScrollbarWidth();

        const containerHeight = this.getContainerHeight();
        const containerWidth = this.getContainerWidth();

        const headerHeight = this.props.fixedHeaderHeight;
        const footerHeight = this.props.fixedFooterHeight;
        const bodyHeight = containerHeight - horizontalScrollbarWidth - headerHeight - footerHeight;

        const leftWidth = this.props.fixedLeftWidth;
        const rightWidth = this.props.fixedRightWidth;
        const centerWidth = containerWidth - verticalScrollbarWidth - leftWidth - rightWidth;

        // create factory method

        return (tileKey: TileKey): TileEntry => {

            const { vertical, horizontal } = this.getTilePosition(tileKey);

            const isVerticalFixed = vertical === 'header' || vertical === 'footer';
            const isHorizontalFixed = horizontal === 'left' || horizontal === 'right';
            const isCorner = isVerticalFixed && isHorizontalFixed;

            return {
                ref: React.createRef<VirtualWindow>(),

                position: {
                    vertical,
                    horizontal
                },

                tileRowTop: vertical === 'header' ? 0 :
                    vertical === 'body' ? headerHeight :
                        headerHeight + bodyHeight,

                rowIndexOffset: vertical === 'header' ? 0 :
                    vertical === 'body' ? (headerHeight && 1) :
                        this.props.rowCount + (headerHeight && 1),

                columnIndexOffset: horizontal === 'left' ? 0 :
                    horizontal === 'center' ? (leftWidth && 1) :
                        this.props.columnCount + (leftWidth && 1),

                props: {
                    className: this.createClassName(tileKey),

                    controlledScroll: true,

                    scrollDirection: isCorner ? 'none' :
                        isVerticalFixed ? 'horizontal' :
                            isHorizontalFixed ? 'vertical' :
                                'both',

                    direction: this.direction,

                    height: vertical === 'header' ? headerHeight :
                        vertical === 'body' ? bodyHeight :
                            footerHeight,

                    width: horizontal === 'left' ? leftWidth :
                        horizontal === 'center' ? centerWidth :
                            rightWidth,

                    columnCount: horizontal === 'left' ? 1 :
                        horizontal === 'center' ? this.props.columnCount :
                            1,

                    rowCount: vertical === 'header' ? 1 :
                        vertical === 'body' ? this.props.rowCount :
                            1,

                    columnWidth: horizontal === 'left' ? leftWidth :
                        horizontal === 'center' ? this.props.columnWidth :
                            rightWidth,

                    rowHeight: vertical === 'header' ? headerHeight :
                        vertical === 'body' ? this.props.rowHeight :
                            footerHeight,

                    overscanColumnsCount: horizontal === 'left' ? 0 :
                        horizontal === 'center' ? this.props.overscanColumnsCount :
                            0,

                    overscanRowCount: vertical === 'header' ? 0 :
                        vertical === 'body' ? this.props.overscanRowCount :
                            0
                }
            };
        };
    }

    private getTilePosition(tileKey: TileKey): TilePosition {
        const [vertical, horizontal] = tileKey.toLowerCase().split('_');
        return {
            vertical,
            horizontal

        } as TilePosition;
    }

    private resetTiles() {
        for (const tileKey of this.activeTiles) {
            this.tiles[tileKey].ref.current?.clearCache();
        }
        this.tiles = {};
    }

    private getContainerHeight(): number {
        const scrollableHeight = this.getScrollableHeight();
        const horizontalScrollbarWidth = this.getHorizontalScrollbarWidth();
        return Math.min(this.height, scrollableHeight + horizontalScrollbarWidth);
    }

    private getContainerWidth(): number {
        const scrollableWidth = this.getScrollableWidth();
        const verticalScrollbarWidth = this.getVerticalScrollbarWidth();
        return Math.min(this.width, scrollableWidth + verticalScrollbarWidth);
    }

    private getScrollableHeight() {

        const headerHeight = this.props.fixedHeaderHeight;
        const footerHeight = this.props.fixedFooterHeight;
        const bodyHeight = this.getBodyScrollableHeight();

        return bodyHeight + headerHeight + footerHeight;
    }

    private getScrollableWidth() {

        const leftWidth = this.props.fixedLeftWidth;
        const rightWidth = this.props.fixedRightWidth;
        const bodyWidth = this.getBodyScrollableWidth();

        return bodyWidth + leftWidth + rightWidth;
    }

    private getBodyScrollableHeight() {
        const body = this.tiles[TileKey.BodyCenter]?.ref?.current;
        if (body)
            return body.getScrollableHeight();

        // Body not rendered yet - have to calculate independently.  
        // Not so DRY, breaks encapsulation and not very efficient either but I
        // couldn't find a better way to do that which is not terribly ugly...
        return this.initialCalculator.getTotalSize(
            'row',
            this.props.rowHeight,
            null, // this.props.estimatedRowHeight,
            this.props.rowCount
        );
    }

    private getBodyScrollableWidth() {
        const body = this.tiles[TileKey.BodyCenter]?.ref?.current;
        if (body)
            return body.getScrollableWidth();

        // Body not rendered yet - have to calculate independently.  
        // Not so DRY, breaks encapsulation and not very efficient either but I
        // couldn't find a better way to do that which is not terribly ugly...
        return this.initialCalculator.getTotalSize(
            'column',
            this.props.columnWidth,
            null, // this.props.estimatedColumnWidth,
            this.props.columnCount
        );
    }

    private getVerticalScrollbarWidth(): number {
        const scrollableHeight = this.getScrollableHeight();
        const hasVerticalScrollbar = scrollableHeight > this.height;
        return (hasVerticalScrollbar && DomUtils.scrollbarWidth) || 0;
    }

    private getHorizontalScrollbarWidth(): number {
        const scrollableWidth = this.getScrollableWidth();
        const hasHorizontalScrollbar = scrollableWidth > this.width;
        return (hasHorizontalScrollbar && DomUtils.scrollbarWidth) || 0;
    }

    /**
     * We are only using classes for easier debug inspection...
     */
    private createClassName(className: string): string {
        return `ReactTablize__VirtualGrid__${className}`;
    }
}