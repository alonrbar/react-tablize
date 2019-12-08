import * as React from 'react';
import { DocDir, ScrollEvent, SizeCallback } from '../types';
import { DomUtils, areShallowEqual } from '../utils';
import { VirtualTile, VirtualTileProps } from './VirtualTile';

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
    absColIndex: number;
    absRowIndex: number;
    relColIndex: number;
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
    public columnCount: number;
    public rowCount: number;
    public estimatedColumnWidth: number;
    public estimatedRowHeight: number;
    public columnWidth?: SizeCallback;
    public rowHeight?: SizeCallback;
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
    ref: React.RefObject<VirtualTile>;
    rowIndexOffset: number;
    columnIndexOffset: number;
    props: Omit<VirtualTileProps, "children">;
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

    private tiles: Partial<TilesMap> = {};

    constructor(props: VirtualGridProps) {
        super(props);
        this.state = new VirtualGridState();
    }

    //
    // life cycle
    //

    public componentDidMount() {
        this.tiles = this.createTilesMap();
        this.forceUpdate();
    }

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
                className={this.createClassName('Container')}
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
                    className={this.createClassName('ScrollableArea')}
                    style={{
                        height: scrollableHeight,
                        width: scrollableWidth
                    }}
                >
                    {this.activeTiles.map(this.renderTile)}
                </div>
            </div>
        );
    }

    private renderTile = (tileKey: TileKey): React.ReactNode => {
        const { ref, props, rowIndexOffset, columnIndexOffset } = this.tiles[tileKey];
        return (
            <VirtualTile
                key={tileKey}
                ref={ref}
                {...props}
                top={props.top + this.state.scrollTop}
                left={props.left + this.state.scrollLeft}
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
            </VirtualTile>
        );
    };

    //
    // event handlers
    //

    private handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
        let { scrollTop, scrollLeft } = e.currentTarget;
        const { scrollHeight, scrollWidth, clientHeight, clientWidth } = e.currentTarget;

        // RTL support
        if (this.direction === 'rtl') {
            switch (DomUtils.rtlOffsetType) {
                case 'negative':
                    scrollLeft = -scrollLeft;
                    break;
                case 'positive-ascending':
                    // noop
                    break;
                case 'positive-descending':
                default:
                    scrollLeft = scrollWidth - clientWidth - scrollLeft;
                    break;
            }
        }

        // fix scroll offset to prevent "over scroll"
        scrollTop = Math.min(scrollTop, scrollHeight - clientHeight);
        scrollLeft = Math.min(scrollLeft, scrollWidth - clientWidth);

        // restore tiles position
        this.setState({
            scrollTop,
            scrollLeft
        });

        // scroll tiles content
        for (const tileKey of this.activeTiles) {
            const { ref } = this.tiles[tileKey];
            ref.current.scroll({
                scrollTop,
                scrollLeft
            });
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

        const bodyRowsCount = this.props.rowCount - (headerHeight && 1) - (footerHeight && 1);

        const leftWidth = this.props.fixedLeftWidth;
        const rightWidth = this.props.fixedRightWidth;
        const centerWidth = containerWidth - verticalScrollbarWidth - leftWidth - rightWidth;

        const centerColumnsCount = this.props.columnCount - (leftWidth && 1) - (rightWidth && 1);

        // create factory method

        return (tileKey: TileKey): TileEntry => {

            const { vertical, horizontal } = this.getTilePosition(tileKey);

            const isVerticalFixed = vertical === 'header' || vertical === 'footer';
            const isHorizontalFixed = horizontal === 'left' || horizontal === 'right';
            const isCorner = isVerticalFixed && isHorizontalFixed;

            return {
                ref: React.createRef<VirtualTile>(),

                rowIndexOffset: vertical === 'header' ? 0 :
                    vertical === 'body' ? (headerHeight && 1) :
                        bodyRowsCount + (headerHeight && 1),

                columnIndexOffset: horizontal === 'left' ? 0 :
                    horizontal === 'center' ? (leftWidth && 1) :
                        centerColumnsCount + (leftWidth && 1),

                props: {
                    className: this.createClassName(tileKey),

                    scrollability: isCorner ? 'none' :
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
                        horizontal === 'center' ? centerColumnsCount :
                            1,

                    rowCount: vertical === 'header' ? 1 :
                        vertical === 'body' ? bodyRowsCount :
                            1,

                    estimatedColumnWidth: horizontal === 'left' ? leftWidth :
                        horizontal === 'center' ? this.props.estimatedColumnWidth :
                            rightWidth,

                    estimatedRowHeight: vertical === 'header' ? headerHeight :
                        vertical === 'body' ? this.props.estimatedRowHeight :
                            footerHeight,

                    top: vertical === 'header' ? 0 :
                        vertical === 'body' ? headerHeight :
                            headerHeight + bodyHeight,

                    left: horizontal === 'left' ? 0 :
                        horizontal === 'center' ? leftWidth :
                            leftWidth + centerWidth,

                    columnWidth: horizontal === 'left' ? null :
                        horizontal === 'center' ? this.props.columnWidth :
                            null,

                    rowHeight: vertical === 'header' ? null :
                        vertical === 'body' ? this.props.rowHeight :
                            null,

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

        let bodyHeight: number;
        const body = this.tiles[TileKey.BodyCenter]?.ref?.current;
        if (body) {
            bodyHeight = body.getScrollableHeight();
        } else {
            const bodyRows = this.props.rowCount - (headerHeight && 1) - (footerHeight && 1);
            bodyHeight = bodyRows * this.props.estimatedRowHeight;
        }

        return bodyHeight + headerHeight + footerHeight;
    }

    private getScrollableAreaWidth() {

        const leftWidth = this.props.fixedLeftWidth;
        const rightWidth = this.props.fixedRightWidth;

        let bodyWidth: number;
        const body = this.tiles[TileKey.BodyCenter]?.ref?.current;
        if (body) {
            bodyWidth = body.getScrollableWidth();
        } else {
            const bodyColumns = this.props.columnCount - (leftWidth && 1) - (rightWidth && 1);
            bodyWidth = bodyColumns * this.props.estimatedColumnWidth;
        }

        return bodyWidth + leftWidth + rightWidth;
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