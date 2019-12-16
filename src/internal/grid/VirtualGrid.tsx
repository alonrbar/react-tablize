import * as React from 'react';
import { DocDir } from '../../types';
import { areShallowEqual, DomUtils, ScrollUtils } from '../utils';
import { VirtualWindow, VirtualWindowProps, WindowCalculator } from '../window';
import { TileKey, TilePosition, VirtualGridProps } from './virtualGridProps';

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

    private initialCalculator = new WindowCalculator();

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
            this.initialCalculator = new WindowCalculator();
            this.tiles = this.createTilesMap();
            this.forceUpdate();
        }
    }

    //
    // render methods
    //

    public render() {
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

    private resetTiles() {
        for (const tileKey of this.activeTiles) {
            this.tiles[tileKey].ref.current.clearCache();
        }
        this.tiles = {};
    }

    private getContainerHeight(): number {
        const scrollableHeight = this.getScrollableHeight();
        const horizontalScrollbarWidth = this.getHorizontalScrollbarWidth();
        return Math.min(this.props.height, scrollableHeight + horizontalScrollbarWidth);
    }

    private getContainerWidth(): number {
        const scrollableWidth = this.getScrollableWidth();
        const verticalScrollbarWidth = this.getVerticalScrollbarWidth();
        return Math.min(this.props.width, scrollableWidth + verticalScrollbarWidth);
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
            this.props.estimatedRowHeight,
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
            this.props.estimatedColumnWidth,
            this.props.columnCount
        );
    }

    private getVerticalScrollbarWidth(): number {
        const scrollableHeight = this.getScrollableHeight();
        const hasVerticalScrollbar = scrollableHeight > this.props.height;
        return (hasVerticalScrollbar && DomUtils.scrollbarWidth) || 0;
    }

    private getHorizontalScrollbarWidth(): number {
        const scrollableWidth = this.getScrollableWidth();
        const hasHorizontalScrollbar = scrollableWidth > this.props.width;
        return (hasHorizontalScrollbar && DomUtils.scrollbarWidth) || 0;
    }

    /**
     * We are only using classes for easier debug inspection...
     */
    private createClassName(className: string): string {
        return `ReactTablize__VirtualGrid__${className}`;
    }
}