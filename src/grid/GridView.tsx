import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid, VariableSizeGridProps, VariableSizeList } from 'react-window';
import { Theme } from '../styled';
import { ErrorBoundary, range, ReactUtils, SizeUtils } from '../utils';
import { BodyCellRender, GridBody } from './GridBody';
import { GridCell } from './GridCell';
import { GridHead } from './GridHead';
import { NonVirtualGrid } from './NonVirtualGrid';
import { FrozenColumnsWrapper, StyledGridBody, StyledGridCell, StyledGridHead, StyledGridView } from './style';

type GridChildren_FullSyntax = [React.SubComp<GridHead>, React.SubComp<GridBody>];
type GridChildren_PartialSyntax = React.SubComp<GridHead> | React.SubComp<GridBody>;
type GridChildren = GridChildren_FullSyntax | GridChildren_PartialSyntax | BodyCellRender;

interface RenderBodyCellArgs {
    cellRender: BodyCellRender;
    rowIndex: number;
    columnIndex: number;
    isScrolling: boolean;
    style?: React.CSSProperties;
}

export interface GridViewProps extends React.DivProps {

    isVirtual?: boolean;
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
     * 
     * Default: 1
     */
    overscanRowsCount?: number;
    /**
     * Number of extra columns to render before/after the visible items.
     * Tweaking this can help reduce scroll flickering on certain
     * browsers/devices.  
     * 
     * Default: 1
     */
    overscanColumnsCount?: number;
    /**
     * Adds an additional isScrolling parameter to the children render function.
     * This parameter can be used to show a placeholder row or column while the
     * list is being scrolled.
     *
     * Note that using this parameter will result in an additional render call
     * after scrolling has stopped (when isScrolling changes from true to
     * false).
     */
    useIsScrolling?: boolean;

    children?: GridChildren;
}

export class GridView extends React.PureComponent<GridViewProps> {

    public static readonly defaultHeight = '35vh';
    public static readonly defaultHeadHeight = '40px';

    //
    // nested types
    //

    public static Head = GridHead;

    public static Body = GridBody;

    // TODO: public static Footer = GridFooter;

    public static Cell = GridCell;

    //
    // component code
    //

    public static defaultProps: Partial<GridViewProps> = {
        overscanRowsCount: 1,
        overscanColumnsCount: 1
    };

    private headList = React.createRef<VariableSizeList>();
    private mainBodyGrid = React.createRef<VariableSizeGrid>();
    private freezedColumnsGrid = React.createRef<VariableSizeGrid>();

    public render() {
        const { columnCount, columnWidth, children, ...divProps } = this.props;
        return (
            <ErrorBoundary>
                <ThemeProvider theme={this.getTheme()}>
                    <StyledGridView
                        {...divProps}
                        style={Object.assign(
                            { direction: this.props.dir },
                            this.props.style,
                            SizeUtils.geElementHeights(this, GridView.defaultHeight))
                        }
                    >
                        {this.renderHead()}
                        {this.renderBody()}
                    </StyledGridView>
                </ThemeProvider>
            </ErrorBoundary>
        );
    }

    private renderHead() {
        const head = ReactUtils.singleChildOfType(this, GridHead);
        if (!head)
            return null;

        const { children: cellRender, ...divProps } = head.props;
        const freezeColumns = this.props.freezeColumns || 0;

        return (
            <StyledGridHead
                {...divProps}
                style={Object.assign({}, head.props.style, SizeUtils.geElementHeights(head, GridView.defaultHeadHeight))}
            >
                <ErrorBoundary>
                    <AutoSizer>
                        {({ width, height }) => (
                            <div style={{ width, height, display: 'flex' }}>

                                {/* frozen first columns */}
                                {range(freezeColumns).map(columnIndex => this.renderCell({
                                    cellRender,
                                    rowIndex: 0,
                                    columnIndex,
                                    isScrolling: false
                                }))}

                                {/* main columns */}
                                <VariableSizeList
                                    ref={this.headList}
                                    direction={this.props.dir}
                                    style={{ overflow: 'hidden' }}
                                    layout="horizontal"
                                    height={height}
                                    width={width - this.getFrozenColumnsWidth()}
                                    itemCount={this.props.columnCount - freezeColumns}
                                    itemSize={colIndex => this.getColumnWidth(colIndex + freezeColumns)}
                                    overscanCount={this.props.overscanColumnsCount}
                                    useIsScrolling={this.props.useIsScrolling}
                                >
                                    {({ index, style, isScrolling }) =>
                                        this.renderCell({
                                            cellRender,
                                            rowIndex: 0,
                                            columnIndex: index + freezeColumns,
                                            isScrolling,
                                            style
                                        })
                                    }
                                </VariableSizeList>

                            </div>
                        )}
                    </AutoSizer>
                </ErrorBoundary>
            </StyledGridHead>
        );
    }

    private renderBody() {

        const body = ReactUtils.singleChildOfType(this, GridBody);
        if (!body)
            return null;
        const { children: cellRender, rowCount, rowHeight, ...divProps } = body.props;

        const head = ReactUtils.singleChildOfType(this, GridHead);
        const heights = SizeUtils.getBodyHeights(this, head, {
            total: GridView.defaultHeight,
            head: GridView.defaultHeadHeight
        });

        return (
            <StyledGridBody
                {...divProps}
                style={Object.assign({}, divProps.style, heights)}
            >
                <ErrorBoundary>
                    <AutoSizer>
                        {({ height, width }) => (
                            <div style={{ width, height, display: 'flex' }}>
                                {this.renderFrozenColumns(height, width, body)}
                                {this.renderMainGrid(height, width, body)}
                            </div>
                        )}
                    </AutoSizer>
                </ErrorBoundary>
            </StyledGridBody>
        );
    }

    private renderFrozenColumns(height: number, width: number, body: GridBody) {
        const freezeColumns = this.props.freezeColumns || 0;
        const frozenColumnsWidth = this.getFrozenColumnsWidth();
        const { children: cellRender, rowCount, rowHeight } = body.props;

        const gridProps: VariableSizeGridProps = {
            direction: this.props.dir,
            style: {
                overflowY: 'scroll',
                boxSizing: 'content-box',
                [(this.props.dir === 'rtl' ? 'paddingLeft' : 'paddingRight')]: SizeUtils.scrollbarWidth
            },
            height: height - SizeUtils.scrollbarWidth,
            width: frozenColumnsWidth,
            columnCount: freezeColumns,
            columnWidth: this.getColumnWidth,
            rowCount,
            rowHeight: this.getRowHeight(rowHeight),
            onScroll: this.handleFrozenColumnsScroll,
            overscanRowsCount: this.props.overscanRowsCount,
            overscanColumnsCount: this.props.overscanColumnsCount,
            useIsScrolling: this.props.useIsScrolling,
            children: ({ rowIndex, columnIndex, style, isScrolling }) =>
                this.renderCell({
                    cellRender,
                    rowIndex,
                    columnIndex,
                    isScrolling,
                    style
                })
        };

        const GridComponent = this.props.isVirtual !== false ?
            VariableSizeGrid :
            NonVirtualGrid;

        return (
            <FrozenColumnsWrapper
                style={{
                    height: height - SizeUtils.scrollbarWidth,
                    width: frozenColumnsWidth
                }}
            >
                <GridComponent
                    ref={this.freezedColumnsGrid}
                    hideVerticalScrollbar={true}
                    {...gridProps}
                />
            </FrozenColumnsWrapper>
        );
    }

    private renderMainGrid(height: number, width: number, body: GridBody) {
        const freezeColumns = this.props.freezeColumns || 0;
        const frozenColumnsWidth = this.getFrozenColumnsWidth();
        const { children: cellRender, rowCount, rowHeight } = body.props;

        const gridProps: VariableSizeGridProps = {
            direction: this.props.dir,
            height,
            width: width - frozenColumnsWidth,
            columnCount: this.props.columnCount - freezeColumns,
            columnWidth: colIndex => this.getColumnWidth(colIndex + freezeColumns),
            rowCount,
            rowHeight: this.getRowHeight(rowHeight),
            onScroll: this.handleMainGridScroll,
            overscanRowsCount: this.props.overscanRowsCount,
            overscanColumnsCount: this.props.overscanColumnsCount,
            useIsScrolling: this.props.useIsScrolling,
            children: ({ rowIndex, columnIndex, style, isScrolling }) =>
                this.renderCell({
                    cellRender,
                    rowIndex,
                    columnIndex: columnIndex + freezeColumns,
                    isScrolling,
                    style
                })
        };

        const GridComponent = this.props.isVirtual !== false ?
            VariableSizeGrid :
            NonVirtualGrid;

        return (
            <GridComponent
                ref={this.mainBodyGrid}
                {...gridProps}
            />
        );
    }

    private renderCell(args: RenderBodyCellArgs) {

        const {
            rowIndex,
            columnIndex,
            cellRender,
            isScrolling,
            style
        } = args;

        // create the cell
        const cell: any = cellRender({ rowIndex, columnIndex, isScrolling });

        // get cell props & content
        const { props: cellProps, content: cellContent } = GridCell.extract(cell);
        const columnWidth = this.getColumnWidth(columnIndex);

        // render
        return (
            <StyledGridCell
                key={`[ ${rowIndex}, ${columnIndex} ]`}
                {...cellProps}
                style={Object.assign({ width: columnWidth }, cellProps.style, style)}
            >
                <ErrorBoundary>
                    {cellContent}
                </ErrorBoundary>
            </StyledGridCell>
        );
    }

    //
    // event handlers
    //

    private handleMainGridScroll = (e: ScrollEvent) => {
        const { scrollTop, scrollLeft } = e;

        // synchronize head
        if (this.headList.current) {
            this.headList.current.scrollTo(scrollLeft);
        }

        // synchronize frozen body columns
        if (this.freezedColumnsGrid.current) {
            this.freezedColumnsGrid.current.scrollTo({ scrollTop } as any);
        }
    }

    private handleFrozenColumnsScroll = (e: ScrollEvent) => {
        const { scrollTop } = e;

        // synchronize main grid
        if (this.mainBodyGrid.current) {
            this.mainBodyGrid.current.scrollTo({ scrollTop } as any);
        }
    }

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
    }

    private getRowHeight = (rowHeightProp: number | SizeCallback) => (rowIndex: number): number => {
        if (typeof rowHeightProp === 'function')
            return rowHeightProp(rowIndex);
        return rowHeightProp;
    }
}