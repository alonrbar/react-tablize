import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
// @ts-ignore
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid, VariableSizeList } from 'react-window';
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
type GridChildren = GridChildren_FullSyntax | BodyCellRender;

export interface GridViewProps extends React.DivProps {

    columnCount: number;
    columnWidth: number | SizeCallback;
    /**
     * Number of columns to freeze (always the first columns).
     */
    freezeColumns?: number;

    dir?: DocDir;

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

    private headList = React.createRef<VariableSizeList>();
    private freezedColumnsGrid = React.createRef<VariableSizeGrid>();

    public render() {
        const { columnCount, columnWidth, children, ...divProps } = this.props;
        return (
            <ErrorBoundary>
                <ThemeProvider theme={this.getTheme()}>
                    <ScrollSync>
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
                    </ScrollSync>
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
                                {utils.range(freezeColumns).map(index => this.renderHeadCell(cellRender, index))}

                                {/* main columns */}
                                <ScrollSyncPane>
                                    <VariableSizeList
                                        ref={this.headList}
                                        direction={this.props.dir}
                                        style={{ overflow: 'hidden' }}
                                        layout="horizontal"
                                        height={height}
                                        width={width - this.getFrozenColumnsWidth()}
                                        itemCount={this.props.columnCount - freezeColumns}
                                        itemSize={colIndex => this.getColumnWidth(colIndex + freezeColumns)}
                                    >
                                        {({ index, style }) => this.renderHeadCell(cellRender, index + freezeColumns, style)}
                                    </VariableSizeList>
                                </ScrollSyncPane>

                            </div>
                        )}
                    </AutoSizer>
                </ErrorBoundary>
            </StyledGridHead>
        );
    }

    private renderHeadCell(cellRender: HeadCellRender, columnIndex: number, style?: React.CSSProperties) {

        // create the cell
        const cell: any = cellRender({ columnIndex });

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
                                <ScrollSyncPane>
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
                                    >
                                        {({ rowIndex, columnIndex, style }) =>
                                            this.renderBodyCell(cellRender, rowIndex, columnIndex, style)
                                        }
                                    </VariableSizeGrid>
                                </ScrollSyncPane>

                                <ScrollSyncPane>
                                    <VariableSizeGrid
                                        direction={this.props.dir}
                                        height={height}
                                        width={width - frozenColumnsWidth}
                                        columnCount={this.props.columnCount - freezeColumns}
                                        columnWidth={colIndex => this.getColumnWidth(colIndex + freezeColumns)}
                                        rowCount={rowCount}
                                        rowHeight={this.getRowHeight(rowHeight)}
                                    >
                                        {({ rowIndex, columnIndex, style }) =>
                                            this.renderBodyCell(cellRender, rowIndex, columnIndex + freezeColumns, style)
                                        }
                                    </VariableSizeGrid>
                                </ScrollSyncPane>
                            </div>
                        )}
                    </AutoSizer>
                </ErrorBoundary>
            </StyledGridBody>
        );
    }

    private renderBodyCell(cellRender: BodyCellRender, rowIndex: number, columnIndex: number, style?: React.CSSProperties) {

        // create the cell
        const cell: any = cellRender({ rowIndex, columnIndex });

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

        const bodyHeight = bodyHeights.height || `calc(${totalHeights.height} - ${headHeight})`;

        let bodyMinHeight: string | number;
        if (bodyHeights.minHeight || totalHeights.minHeight)
            bodyMinHeight = bodyHeights.minHeight || `calc(${totalHeights.minHeight} - ${headHeight})`;

        let bodyMaxHeight: string | number;
        if (bodyHeights.maxHeight || totalHeights.maxHeight)
            bodyMaxHeight = bodyHeights.maxHeight || `calc(${totalHeights.maxHeight} - ${headHeight})`;

        return {
            height: bodyHeight,
            minHeight: bodyMinHeight,
            maxHeight: bodyMaxHeight
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