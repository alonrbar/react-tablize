import { Theme } from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { RenderCellProps, VirtualGrid } from '../core';
import { DocDir, SizeCallback } from '../types';
import { ErrorBoundary, range, ReactUtils, SizeUtils } from '../utils';
import { BodyCellRender, GridBody } from './GridBody';
import { GridHead } from './GridHead';

type GridChildren_FullSyntax = [React.SubComp<GridHead>, React.SubComp<GridBody>];
type GridChildren_PartialSyntax = React.SubComp<GridHead> | React.SubComp<GridBody>;
type GridChildren = GridChildren_FullSyntax | GridChildren_PartialSyntax | BodyCellRender;

export interface GridViewProps extends React.DivProps {

    columnCount: number;
    columnWidth: number | SizeCallback;
    /**
     * Number of columns to freeze (always the first columns).
     */
    freezeColumns?: number;

    dir?: DocDir;

    /**
     * Number of extra rows to render above/below the visible items.
     * Tweaking this can help reduce scroll flickering on certain
     * browsers/devices.  
     */
    overscanRowsCount?: number;
    /**
     * Number of extra columns to render before/after the visible items.
     * Tweaking this can help reduce scroll flickering on certain
     * browsers/devices.  
     */
    overscanColumnsCount?: number;

    children?: GridChildren;
}

export class GridView extends React.PureComponent<GridViewProps> {

    public static readonly defaultHeight = '35vh';
    public static readonly defaultHeadHeight = 40;
    public static readonly defaultColumnWidth = 100;
    public static readonly defaultRowHeight = 50;

    //
    // nested types
    //

    public static Head = GridHead;

    public static Body = GridBody;

    //
    // render methods
    //

    public render() {

        const head = ReactUtils.singleChildOfType(this, GridHead);
        const body = ReactUtils.singleChildOfType(this, GridBody);
        if (!body)
            return null;

        const { columnCount, columnWidth, children, ...divProps } = this.props;
        const headHeight = head ? (head.props.height || GridView.defaultHeadHeight) : 0;
        const { rowCount, rowHeight } = body.props;

        const estimatedColumnWidth = typeof columnWidth === 'function' ? GridView.defaultColumnWidth : columnWidth;
        const calculateColumnWidth = typeof columnWidth === 'function' ? columnWidth : undefined;
        const estimatedRowHeight = typeof rowHeight === 'function' ? GridView.defaultRowHeight : rowHeight;
        const calculateRowHeight = typeof rowHeight === 'function' ? rowHeight : undefined;

        return (
            <ErrorBoundary>
                <ThemeProvider theme={this.getTheme()}>
                    <div
                        {...divProps}
                        style={Object.assign(
                            {
                                direction: this.props.dir,
                                width: '100%'
                            },
                            this.props.style,
                            SizeUtils.geElementHeights(this, GridView.defaultHeight))
                        }
                    >
                        <AutoSizer>
                            {({ width, height }) => (
                                <VirtualGrid

                                    style={{
                                        direction: this.props.dir
                                    }}

                                    height={height}
                                    width={width}

                                    columnCount={columnCount}
                                    rowCount={rowCount}
                                    overscanColumnsCount={this.props.overscanColumnsCount}
                                    overscanRowCount={this.props.overscanRowsCount}

                                    estimatedColumnWidth={estimatedColumnWidth}
                                    columnWidth={calculateColumnWidth}
                                    estimatedRowHeight={estimatedRowHeight}
                                    rowHeight={calculateRowHeight}

                                    fixedHeaderHeight={headHeight}
                                    fixedLeftWidth={this.getFrozenColumnsWidth()}
                                >
                                    {this.renderGridCell}
                                </VirtualGrid>
                            )}
                        </AutoSizer>
                    </div>
                </ThemeProvider>
            </ErrorBoundary>
        );
    }

    private renderGridCell = (cellProps: RenderCellProps) => {

        if (cellProps.tilePosition.vertical === 'header')
            return this.renderHeadCell(cellProps);

        if (cellProps.tilePosition.vertical === 'body')
            return this.renderBodyCell(cellProps);

        throw new Error(`Footer not supported...`);
    };

    private renderHeadCell = (cellProps: RenderCellProps) => {

        const head = ReactUtils.singleChildOfType(this, GridHead);
        if (!head)
            return null;

        const { children: cellRender } = head.props;
        const freezeColumns = this.props.freezeColumns || 0;

        // frozen columns
        if (cellProps.tilePosition.horizontal === 'left') {
            return (
                <div style={{ display: 'flex' }}>
                    {range(freezeColumns).map(columnIndex => (
                        <div key={columnIndex} style={{ flex: 1 }}>
                            <ErrorBoundary>
                                {cellRender({ columnIndex })}
                            </ErrorBoundary>
                        </div>
                    ))}
                </div>
            );
        }

        // other head columns
        return (
            <ErrorBoundary>
                {cellRender({ columnIndex: cellProps.relColIndex + freezeColumns })}
            </ErrorBoundary>
        );
    };

    private renderBodyCell = (cellProps: RenderCellProps) => {

        const body = ReactUtils.singleChildOfType(this, GridBody);
        if (!body)
            return null;

        const { children: cellRender } = body.props;
        const freezeColumns = this.props.freezeColumns || 0;

        if (cellProps.tilePosition.horizontal === 'left') {
            return (
                <div style={{ display: 'flex' }}>
                    {range(freezeColumns).map(columnIndex => (
                        <div key={columnIndex} style={{ flex: 1 }}>
                            <ErrorBoundary>
                                {cellRender({ rowIndex: cellProps.relRowIndex, columnIndex })}
                            </ErrorBoundary>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <ErrorBoundary>
                {cellRender({
                    rowIndex: cellProps.relRowIndex,
                    columnIndex: cellProps.relRowIndex + freezeColumns
                })}
            </ErrorBoundary>
        );
    };

    //
    // helpers
    //

    private getTheme(): Theme {
        return {
            dir: this.props.dir
        };
    }

    private getFrozenColumnsWidth(): number {
        if (!this.props.freezeColumns)
            return 0;
        const width = range(this.props.freezeColumns)
            .map(this.getColumnWidth)
            .reduce((a, b) => a + b, 0);
        return width;
    }

    private getColumnWidth = (colIndex: number): number => {
        if (typeof this.props.columnWidth === 'function')
            return this.props.columnWidth(colIndex);
        return this.props.columnWidth;
    };
}