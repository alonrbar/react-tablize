import * as React from 'react';
import { DocDir, ScrollEvent, SizeCallback } from '../../types';
import { areShallowEqual, DomUtils, ScrollUtils } from '../utils';
import { VirtualWindow, VirtualWindowProps, WindowCalculator } from '../window';

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
    height: number;
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
    /**
     * If `columnWidth` is a function and this prop is not specified will use
     * eager evaluation (invoke the method for all cells on component mount) to
     * calculate the total scroll width.
     */
    public estimatedColumnWidth?: number;
    /**
     * If `rowHeight` is a function and this prop is not specified will use
     * eager evaluation (invoke the method for all cells on component mount) to
     * calculate the total scroll height.
     */
    public estimatedRowHeight?: number;
    public overscanColumnsCount?= 0;
    public overscanRowCount?= 0;

    public fixedHeaderHeight?= 0;
    public fixedFooterHeight?= 0;
    public fixedLeftWidth?= 0;
    public fixedRightWidth?= 0;

    public style?: React.CSSProperties;
    public tileStyle?: (tileKey: TileKey) => React.CSSProperties;

    public children: (props: RenderCellProps) => React.ReactNode;
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

class VirtualGridState {
    public scrollTop = 0;
    public scrollLeft = 0;
}

export class VirtualGrid extends React.PureComponent<VirtualGridProps, VirtualGridState> {

    public static defaultProps: unknown = new VirtualGridProps();

    private get direction(): DocDir {
        return this.props.style?.direction === 'rtl' ? 'rtl' : 'ltr';
    }

    private get activeTiles(): TileKey[] {
        return Object.keys(this.tiles) as TileKey[];
    }

    private get headerTiles(): TileKey[] {
        return this.activeTiles.filter(key => this.tiles[key].position.vertical === 'header');
    }

    private get bodyTiles(): TileKey[] {
        return this.activeTiles.filter(key => this.tiles[key].position.vertical === 'body');
    }

    private get footerTiles(): TileKey[] {
        return this.activeTiles.filter(key => this.tiles[key].position.vertical === 'footer');
    }

    private tiles: Partial<TilesMap> = {};

    constructor(props: VirtualGridProps) {
        super(props);
        this.state = new VirtualGridState();
        this.tiles = this.createTilesMap();
    }

    //
    // life cycle
    //

    public componentDidUpdate(prevProps: VirtualGridProps) {
        if (!areShallowEqual(this.props, prevProps)) {
            this.tiles = this.createTilesMap();
            this.forceUpdate();
        }
    }

    //
    // render methods
    //

    public render() {

        const scrollableHeight = this.getScrollableAreaHeight();
        const scrollableWidth = this.getScrollableAreaWidth();

        return (
            <div
                className={this.createClassName('Main_Container')}
                style={{
                    direction: this.direction,
                    position: 'relative',
                    height: this.getContainerHeight(scrollableHeight, scrollableWidth),
                    width: this.getContainerWidth(scrollableHeight, scrollableWidth),
                    overflow: 'auto',
                    ...this.props.style
                }}
                onScroll={this.handleScroll}
            >
                <div
                    className={this.createClassName('Main_ScrollableArea')}
                    style={{
                        height: scrollableHeight,
                        width: scrollableWidth
                    }}
                >
                    {this.renderTilesRow(this.headerTiles)}
                    {this.renderTilesRow(this.bodyTiles)}
                    {this.renderTilesRow(this.footerTiles)}
                </div>
            </div>
        );
    }

    private renderTilesRow(tileKeys: TileKey[]) {
        if (!tileKeys?.length)
            return null;

        const firstTile = this.tiles[tileKeys[0]];

        const rightOrLeft = this.direction === 'rtl' ? 'right' : 'left';

        const isSticky = DomUtils.isPositionStickySupported;
        const position = isSticky ? 'sticky' : 'absolute';
        const topOffset = (isSticky ? 0 : this.state.scrollTop);
        const leftOffset = (isSticky ? 0 : this.state.scrollLeft);

        const width = tileKeys
            .map(key => this.tiles[key].props.width)
            .reduce((total, cur) => total + cur, 0);

        return (
            <div
                style={{
                    display: 'flex',
                    position,
                    top: firstTile.tileRowTop + topOffset,
                    [rightOrLeft]: 0 + leftOffset,
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

        if (!DomUtils.isPositionStickySupported) {
            // Need to restore tiles position
            this.setState({
                scrollTop: normalized.scrollTop,
                scrollLeft: normalized.normalizedScrollLeft
            });
        }

        // Scroll tiles content
        for (const tileKey of this.activeTiles) {
            const { ref } = this.tiles[tileKey];
            ref.current.scrollTo(normalized);
        }
    };

    //
    // render helpers
    //

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

        const scrollableHeight = this.getScrollableAreaHeight();
        const scrollableWidth = this.getScrollableAreaWidth();

        const horizontalScrollbarWidth = this.getHorizontalScrollbarWidth(scrollableWidth);
        const verticalScrollbarWidth = this.getVerticalScrollbarWidth(scrollableHeight);

        const containerHeight = this.getContainerHeight(scrollableHeight, scrollableWidth);
        const containerWidth = this.getContainerWidth(scrollableHeight, scrollableWidth);

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

                    estimatedColumnWidth: horizontal === 'left' ? leftWidth :
                        horizontal === 'center' ? this.props.estimatedColumnWidth :
                            rightWidth,

                    estimatedRowHeight: vertical === 'header' ? headerHeight :
                        vertical === 'body' ? this.props.estimatedRowHeight :
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

    private getScrollableAreaHeight() {

        const headerHeight = this.props.fixedHeaderHeight;
        const footerHeight = this.props.fixedFooterHeight;
        const bodyHeight = this.getBodyScrollableHeight();

        return bodyHeight + headerHeight + footerHeight;
    }

    private getBodyScrollableHeight() {
        const body = this.tiles[TileKey.BodyCenter]?.ref?.current;
        if (body)
            return body.getScrollableHeight();

        // Body not rendered yet - have to calculate independently.  
        // Not so DRY, breaks encapsulation and not very efficient either but I
        // couldn't find a better way to do that which is not terribly ugly...
        return new WindowCalculator().getTotalSize(
            'row',
            this.props.rowHeight,
            this.props.estimatedRowHeight,
            this.props.rowCount
        );
    }

    private getScrollableAreaWidth() {

        const leftWidth = this.props.fixedLeftWidth;
        const rightWidth = this.props.fixedRightWidth;
        const bodyWidth = this.getBodyScrollableAreaWidth();

        return bodyWidth + leftWidth + rightWidth;
    }

    private getBodyScrollableAreaWidth() {
        const body = this.tiles[TileKey.BodyCenter]?.ref?.current;
        if (body)
            return body.getScrollableWidth();

        // Body not rendered yet - have to calculate independently.  
        // Not so DRY, breaks encapsulation and not very efficient either but I
        // couldn't find a better way to do that which is not terribly ugly...
        return new WindowCalculator().getTotalSize(
            'column',
            this.props.columnWidth,
            this.props.estimatedColumnWidth,
            this.props.columnCount
        );
    }

    private getVerticalScrollbarWidth(scrollableHeight: number): number {
        const hasVerticalScrollbar = scrollableHeight > this.props.height;
        return (hasVerticalScrollbar && DomUtils.scrollbarWidth) || 0;
    }

    private getHorizontalScrollbarWidth(scrollableWidth: number): number {
        const hasHorizontalScrollbar = scrollableWidth > this.props.width;
        return (hasHorizontalScrollbar && DomUtils.scrollbarWidth) || 0;
    }

    private getContainerHeight(scrollableHeight: number, scrollableWidth: number): number {
        const horizontalScrollbarWidth = this.getHorizontalScrollbarWidth(scrollableWidth);
        return Math.min(this.props.height, scrollableHeight + horizontalScrollbarWidth);
    }

    private getContainerWidth(scrollableHeight: number, scrollableWidth: number): number {
        const verticalScrollbarWidth = this.getVerticalScrollbarWidth(scrollableHeight);
        return Math.min(this.props.width, scrollableWidth + verticalScrollbarWidth);
    }

    /**
     * We are only using classes for easier debug inspection...
     */
    private createClassName(className: string): string {
        return `ReactTablize__VirtualGrid__${className}`;
    }

    //
    // misc
    //

    private resetTiles() {
        for (const tileKey of this.activeTiles) {
            this.tiles[tileKey].ref.current.clearCache();
        }
        this.tiles = {};
    }
}