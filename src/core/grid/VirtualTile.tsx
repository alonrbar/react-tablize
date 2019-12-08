import * as React from 'react';
import { DocDir, ScrollEvent, SizeCallback } from '../../types';
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

    private windowCalc = new WindowCalculator();

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

        const columns = this.windowCalc.elementsInRange(
            'column',
            this.state.scrollLeft,
            this.state.scrollLeft + this.props.width,
            this.props.overscanColumnsCount,
            this.props.estimatedColumnWidth,
            this.props.columnWidth,
            this.props.columnCount
        );
        const rows = this.windowCalc.elementsInRange(
            'row',
            this.state.scrollTop,
            this.state.scrollTop + this.props.height,
            this.props.overscanRowCount,
            this.props.estimatedRowHeight,
            this.props.rowHeight,
            this.props.rowCount
        );

        const cells: React.ReactNode[] = [];
        for (const col of columns) {
            for (const row of rows) {
                cells.push(
                    <VirtualCell
                        key={`${col.index}, ${row.index}`}
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

        return cells;
    }
}