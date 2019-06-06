import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { GridOnScrollProps, VariableSizeGrid, VariableSizeList } from 'react-window';
import { Theme } from '../styled';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import { ReactUtils } from '../utils/reactUtils';
import * as utils from '../utils/utils';
import { BodyCellRender, GridBody } from './GridBody';
import { GridCell } from './GridCell';
import { GridFooter } from './GridFooter';
import { GridHead, HeadCellRender } from './GridHead';
import { scrollbarWidth, StyledGridBody, StyledGridBodyCell, StyledGridHead, StyledGridHeadCell, StyledGridView } from './style';

type GridChildren_FullSyntax = [React.SubComp<GridHead>, React.SubComp<GridBody>];
type GridChildren_PartialSyntax = React.SubComp<GridHead> | React.SubComp<GridBody>;
type GridChildren = GridChildren_FullSyntax | GridChildren_PartialSyntax | BodyCellRender;

interface RenderHeadCellArgs {
    cellRender: HeadCellRender;
    columnIndex: number;
    isScrolling: boolean;
    style?: React.CSSProperties;
}

interface RenderBodyCellArgs {
    cellRender: BodyCellRender;
    rowIndex: number;
    columnIndex: number;
    isScrolling: boolean;
    style?: React.CSSProperties;
}

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

    public static defaultProps = {
        overscanRowsCount: 1,
        overscanColumnsCount: 1
    };

    private headList = React.createRef<VariableSizeList>();
    private mainBodyGrid = React.createRef<VariableSizeGrid>();
    private freezedColumnsGrid = React.createRef<VariableSizeGrid>();

    public render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { columnCount, columnWidth, children, ...divProps } = this.props;
        return (
            <ErrorBoundary>
                <ThemeProvider theme={this.getTheme()}>
                    <StyledGridView
                        {...divProps}
                        style={Object.assign(
                            { direction: this.props.dir },
                            this.props.style,
                            utils.getHeights(divProps.style, GridView.defaultHeight))
                        }
                    >
                        {this.renderHead()}
                        {this.renderBody()}
                        {this.renderFooter()}
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
                style={Object.assign({}, head.props.style, utils.getHeights(divProps.style, GridView.defaultHeadHeight))}
            >
                <ErrorBoundary>
                    <AutoSizer>
                        {({ width, height }) => (
                            <div style={{ width, height, display: 'flex' }}>

                                {/* frozen first columns */}
                                {utils.range(freezeColumns).map(columnIndex => this.renderHeadCell({
                                    cellRender,
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
                                        this.renderHeadCell({
                                            cellRender,
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

    private renderHeadCell(args: RenderHeadCellArgs) {

        const {
            columnIndex,
            cellRender,
            isScrolling,
            style
        } = args;

        // create the cell
        const cell: any = cellRender({ columnIndex, isScrolling });

        // get cell props & content
        const { props: cellProps, content: cellContent } = GridCell.extract(cell);
        const columnWidth = this.getColumnWidth(columnIndex);

        // render
        return (
            <StyledGridHeadCell
                key={columnIndex}
                {...cellProps}
                style={Object.assign({ width: columnWidth }, cellProps.style, style)}
            >
                <ErrorBoundary>
                    {cellContent}
                </ErrorBoundary>
            </StyledGridHeadCell>
        );
    }

    private renderBody() {

        const body = ReactUtils.singleChildOfType(this, GridBody);
        if (!body)
            return null;
        const { children: cellRender, rowCount, rowHeight, ...divProps } = body.props;

        const heights = this.getBodyHeights();
        const freezeColumns = this.props.freezeColumns || 0;
        const frozenColumnsWidth = this.getFrozenColumnsWidth();

        return (
            <StyledGridBody
                {...divProps}
                style={Object.assign({}, divProps.style, heights)}
            >
                <ErrorBoundary>
                    <AutoSizer>
                        {({ height, width }) => (
                            <div style={{ width, height, display: 'flex' }}>

                                {/* frozen first columns */}
                                <VariableSizeGrid
                                    ref={this.freezedColumnsGrid}
                                    direction={this.props.dir}
                                    style={{ overflow: 'hidden' }}
                                    height={height - scrollbarWidth}
                                    width={frozenColumnsWidth}
                                    columnCount={freezeColumns}
                                    columnWidth={this.getColumnWidth}
                                    rowCount={rowCount}
                                    rowHeight={this.getRowHeight(rowHeight)}
                                    overscanRowsCount={this.props.overscanRowsCount}
                                    useIsScrolling={this.props.useIsScrolling}
                                >
                                    {({ rowIndex, columnIndex, style, isScrolling }) =>
                                        this.renderBodyCell({
                                            cellRender,
                                            rowIndex,
                                            columnIndex,
                                            isScrolling,
                                            style
                                        })
                                    }
                                </VariableSizeGrid>

                                <VariableSizeGrid
                                    ref={this.mainBodyGrid}
                                    direction={this.props.dir}
                                    height={height}
                                    width={width - frozenColumnsWidth}
                                    columnCount={this.props.columnCount - freezeColumns}
                                    columnWidth={colIndex => this.getColumnWidth(colIndex + freezeColumns)}
                                    rowCount={rowCount}
                                    rowHeight={this.getRowHeight(rowHeight)}
                                    onScroll={this.syncScroll}
                                    overscanRowsCount={this.props.overscanRowsCount}
                                    overscanColumnsCount={this.props.overscanColumnsCount}
                                    useIsScrolling={this.props.useIsScrolling}
                                >
                                    {({ rowIndex, columnIndex, style, isScrolling }) =>
                                        this.renderBodyCell({
                                            cellRender,
                                            rowIndex,
                                            columnIndex: columnIndex + freezeColumns,
                                            isScrolling,
                                            style
                                        })
                                    }
                                </VariableSizeGrid>
                            </div>
                        )}
                    </AutoSizer>
                </ErrorBoundary>
            </StyledGridBody>
        );
    }

    private renderBodyCell(args: RenderBodyCellArgs) {

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

        // render
        return (
            <StyledGridBodyCell
                key={`[ ${rowIndex}, ${columnIndex} ]`}
                {...cellProps}
                style={Object.assign({}, cellProps.style, style)}
            >
                <ErrorBoundary>
                    {cellContent}
                </ErrorBoundary>
            </StyledGridBodyCell>
        );
    }

    private renderFooter() {
        const footer = ReactUtils.singleChildOfType(this, GridFooter);
        if (!footer)
            return null;

        return (
            <span>Footer</span>
        );
    }

    //
    // event handlers
    //

    private syncScroll = (e: GridOnScrollProps) => {
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

    //
    // helpers
    //

    private getTheme(): Theme {
        return {
            dir: this.props.dir
        };
    }

    private getBodyHeights(): Heights {

        const totalHeights = utils.getHeights(this.props.style, GridView.defaultHeight);
        const headHeight = this.getHeadHeight();
        const bodyHeights = utils.getHeights(this.props.style, undefined);

        let height = bodyHeights.height || totalHeights.height;
        let minHeight = bodyHeights.minHeight || totalHeights.minHeight;
        let maxHeight = bodyHeights.maxHeight || totalHeights.maxHeight;

        if (headHeight) {
            height = `calc(${height} - ${headHeight})`;
            if (minHeight)
                minHeight = `calc(${minHeight} - ${headHeight})`;
            if (maxHeight)
                maxHeight = `calc(${maxHeight} - ${headHeight})`;
        }

        return {
            height,
            minHeight,
            maxHeight
        };
    }

    private getHeadHeight(): string | number {
        const head = ReactUtils.singleChildOfType(this, GridHead);
        let headHeight: string | number = 0;
        if (head) {
            headHeight = utils.getHeights(head.props.style, GridView.defaultHeadHeight).height;
        }
        return headHeight;
    }

    private getFrozenColumnsWidth(): number {
        if (!this.props.freezeColumns)
            return 0;
        const width = utils.range(this.props.freezeColumns)
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