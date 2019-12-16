import * as React from 'react';
import { DocDir, IMap, ScrollDirection, SizeCallback } from '../types';
import { areShallowEqual, NormalizedScrollEvent, ScrollUtils } from '../utils';
import { RecycleManager } from './recycleManager';
import { VirtualCell } from './VirtualCell';
import { ElementInfo, WindowCalculator } from './windowCalculator';

export interface RenderTileCellProps {
    colIndex: number;
    rowIndex: number;
    height: number;
    width: number;
}

export class VirtualTileProps {
    public direction?: DocDir = 'ltr';
    /**
     * Allow scrolling only via calling the `scrollTo` method.
     */
    public controlledScroll?: boolean;
    public height: number;
    public width: number;
    public columnCount: number;
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

    /**
     * We are only using classes for easier debug inspection...
     */
    public className?: string;
    public style?: React.CSSProperties;

    public children: (props: RenderTileCellProps) => React.ReactNode;
}

class VirtualTileState {
    public scrollTop = 0;
    public scrollLeft = 0;
}

export class VirtualTile extends React.PureComponent<VirtualTileProps, VirtualTileState> {

    public static defaultProps: unknown = new VirtualTileProps();

    /**
     * Make sure to return a constant number of elements, this is important for
     * recycling purposes.
     */
    private minColumnsToRender = 0;
    /**
     * Make sure to return a constant number of elements, this is important for
     * recycling purposes.
     */
    private minRowsToRender = 0;

    private windowCalc = new WindowCalculator();
    private recycler = new RecycleManager();

    private containerElement = React.createRef<HTMLDivElement>();

    constructor(props: VirtualTileProps) {
        super(props);

        this.state = new VirtualTileState();
    }

    //
    // public methods
    //

    public scrollTo(e: NormalizedScrollEvent, scrollDirection: ScrollDirection = 'both'): void {

        switch (scrollDirection) {

            case 'both':
                window.requestAnimationFrame(() => {
                    this.containerElement.current.scrollTop = e.scrollTop;
                    this.containerElement.current.scrollLeft = e.rawScrollLeft;
                });
                this.setState({
                    scrollTop: e.scrollTop,
                    scrollLeft: e.normalizedScrollLeft
                });
                break;

            case 'vertical':
                window.requestAnimationFrame(() => {
                    this.containerElement.current.scrollTop = e.scrollTop;
                });
                this.setState({ scrollTop: e.scrollTop });
                break;

            case 'horizontal':
                window.requestAnimationFrame(() => {
                    this.containerElement.current.scrollLeft = e.rawScrollLeft;
                });
                this.setState({ scrollLeft: e.normalizedScrollLeft });
                break;

            case 'none':
                break;

            default:
                throw new Error(`Invalid ${nameof(scrollDirection)} value: '${scrollDirection}'.`);
        }
    }

    public getScrollableHeight(): number {
        return this.windowCalc.getTotalSize(
            'row',
            this.props.rowHeight,
            this.props.estimatedRowHeight,
            this.props.rowCount
        );
    }

    public getScrollableWidth(): number {
        return this.windowCalc.getTotalSize(
            'column',
            this.props.columnWidth,
            this.props.estimatedColumnWidth,
            this.props.columnCount
        );
    }

    public clearCache(): void {
        this.windowCalc = new WindowCalculator();
        this.minColumnsToRender = 0;
        this.minRowsToRender = 0;
    }

    //
    // life cycle
    //

    public componentDidMount() {
        this.clearCache();
        this.forceUpdate();
    }

    public componentDidUpdate(prevProps: VirtualTileProps) {
        if (!areShallowEqual(this.props, prevProps)) {
            this.clearCache();
            this.forceUpdate();
        }
    }

    //
    // render methods
    //

    public render() {

        const overflow = this.props.controlledScroll ? 'hidden' : 'auto';
        const onScroll = this.props.controlledScroll ? undefined : this.handleScroll;

        return (
            <div
                ref={this.containerElement}
                className={this.props.className + '_Container'}
                style={{
                    direction: this.props.direction,
                    height: this.props.height,
                    width: this.props.width,
                    position: 'relative',
                    overflow,
                    ...this.props.style
                }}
                onScroll={onScroll}
            >
                <div
                    className={this.props.className + '_ScrollableArea'}
                    style={{
                        height: this.getScrollableHeight(),
                        width: this.getScrollableWidth()
                    }}
                >
                    {this.renderCells()}
                </div>
            </div>
        );
    }

    private renderCells() {

        // get cell indexes to render

        const columns = this.windowCalc.elementsInRange(
            'column',
            this.state.scrollLeft,
            this.state.scrollLeft + this.props.width,
            this.props.overscanColumnsCount,
            this.props.columnWidth,
            this.minColumnsToRender,
            this.props.columnCount
        );
        const rows = this.windowCalc.elementsInRange(
            'row',
            this.state.scrollTop,
            this.state.scrollTop + this.props.height,
            this.props.overscanRowCount,
            this.props.rowHeight,
            this.minRowsToRender,
            this.props.rowCount
        );

        this.minColumnsToRender = columns.length;
        this.minRowsToRender = rows.length;

        // free unused stable keys before rendering

        const originalKeys: IMap<boolean> = {};
        for (const row of rows) {
            for (const col of columns) {
                const originalKey = this.getCellOriginalKey(col.index, row.index);
                originalKeys[originalKey] = true;
            }
        }
        this.recycler.freeUnusedKeys(originalKeys);

        // render cells

        const cellsByKey: IMap<React.ReactNode> = {};
        for (const row of rows) {
            for (const col of columns) {

                const originalKey = this.getCellOriginalKey(col.index, row.index);
                const stableKey = this.recycler.getStableKey(originalKey);

                cellsByKey[stableKey] = this.renderCell(col, row, stableKey);
            }
        }

        // sort the cells by key order (important for recycling)
        // https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
        const cells: React.ReactNode[] = [];
        for (const key of Object.keys(cellsByKey)) {
            cells.push(cellsByKey[key]);
        }

        return cells;
    }

    private renderCell(col: ElementInfo, row: ElementInfo, stableKey: React.Key): React.ReactNode {
        return (
            <VirtualCell
                className={this.props.className + '_Cell'}
                key={stableKey}
                direction={this.props.direction}
                height={row.size}
                width={col.size}
                top={row.position}
                left={col.position}
            >
                {this.props.children({
                    colIndex: col.index,
                    rowIndex: row.index,
                    height: row.size,
                    width: col.size
                })}
            </VirtualCell>
        );
    }

    //
    // event handlers
    //

    private handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
        const normalized = ScrollUtils.normalizeScrollEvent(e, this.props.direction);
        this.setState({
            scrollTop: normalized.scrollTop,
            scrollLeft: normalized.normalizedScrollLeft
        });
    };

    //
    // render helpers
    //

    private getCellOriginalKey(colIndex: number, rowIndex: number): number {
        const rowCountDigits = this.props.rowCount.toString().length;
        return colIndex * Math.pow(10, rowCountDigits) + rowIndex;;
    }
}