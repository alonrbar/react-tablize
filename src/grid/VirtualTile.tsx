import * as React from 'react';
import { DocDir, IMap, ScrollEvent, SizeCallback } from '../types';
import { RecycleManager } from './recycleManager';
import { VirtualCell } from './VirtualCell';
import { WindowCalculator } from './windowCalculator';

export type Scrollability = 'vertical' | 'horizontal' | 'none' | 'both';

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

    /**
     * We are only using classes for easier debug inspection...
     */
    className: string;

    children: (props: RenderTileCellProps) => React.ReactNode;
}

class VirtualTileState {
    public scrollTop = 0;
    public scrollLeft = 0;
}

export class VirtualTile extends React.PureComponent<VirtualTileProps, VirtualTileState> {

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

    constructor(props: VirtualTileProps) {
        super(props);

        this.state = new VirtualTileState();
    }

    //
    // public methods
    //

    public scroll(e: ScrollEvent): void {
        const { scrollTop, scrollLeft } = e;

        switch (this.props.scrollability) {

            case 'both':
                this.setState({ scrollTop, scrollLeft });
                break;

            case 'vertical':
                this.setState({ scrollTop });
                break;

            case 'horizontal':
                this.setState({ scrollLeft });
                break;

            case 'none':
                break;

            default:
                throw new Error(`Invalid ${nameof(this.props.scrollability)} value: '${this.props.scrollability}'.`);
        }
    }

    public getScrollableHeight(): number {
        return this.windowCalc.getEstimatedTotalSize('row', this.props.estimatedRowHeight, this.props.rowCount);
    }

    public getScrollableWidth(): number {
        return this.windowCalc.getEstimatedTotalSize('column', this.props.estimatedColumnWidth, this.props.columnCount);
    }

    public clearCache(): void {
        this.windowCalc = new WindowCalculator();
        this.minColumnsToRender = 0;
        this.minRowsToRender = 0;
    }

    //
    // render methods
    //

    public render() {

        const rightOrLeft = this.props.direction === 'rtl' ? 'right' : 'left';

        return (
            <div
                className={this.props.className}
                style={{
                    height: this.props.height,
                    width: this.props.width,
                    position: 'absolute',
                    top: this.props.top,
                    [rightOrLeft]: this.props.left,
                    overflow: 'hidden'
                }}
            >
                {this.renderCells()}
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
            this.props.estimatedColumnWidth,
            this.props.columnWidth,
            this.minColumnsToRender,
            this.props.columnCount
        );
        const rows = this.windowCalc.elementsInRange(
            'row',
            this.state.scrollTop,
            this.state.scrollTop + this.props.height,
            this.props.overscanRowCount,
            this.props.estimatedRowHeight,
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

                cellsByKey[stableKey] = (
                    <VirtualCell
                        key={stableKey}
                        direction={this.props.direction}
                        height={row.size}
                        width={col.size}
                        top={row.basePosition - this.state.scrollTop}
                        left={col.basePosition - this.state.scrollLeft}
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
        }

        // sort the cells by key order
        // https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
        const cells: React.ReactNode[] = [];
        for (const key of Object.keys(cellsByKey)) {
            cells.push(cellsByKey[key]);
        }

        return cells;
    }

    private getCellOriginalKey(colIndex: number, rowIndex: number): React.Key {
        return `${colIndex}, ${rowIndex}`;
    }
}