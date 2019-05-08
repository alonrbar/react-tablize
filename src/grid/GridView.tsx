import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid, FixedSizeList, GridOnScrollProps } from 'react-window';
import { Theme } from '../styled';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import { ReactUtils } from '../utils/reactUtils';
import * as utils from '../utils/utils';
import { BodyCellRender, GridBody } from './GridBody';
import { GridCell } from './GridCell';
import { GridFooter } from './GridFooter';
import { GridHead, HeadCellRender } from './GridHead';
import { scrollbarWidth, StyledGridBody, StyledGridBodyCell, StyledGridHead, StyledGridHeadCell, StyledGridView } from './style';

type FullSyntaxChildren = [React.SubComp<GridHead>, React.SubComp<GridBody>];
type GridChildren = FullSyntaxChildren | BodyCellRender;

export interface GridViewProps extends React.DivProps {

    columnCount: number;
    columnWidth: number;
    freezeColumns?: number;
    rowCount: number;
    rowHeight: number;

    dir?: DocDir;

    children?: GridChildren;
}

interface GridViewState {
    scrollTop: number;
    scrollLeft: number;
}

export class GridView extends React.PureComponent<GridViewProps, GridViewState> {

    public static readonly defaultHeight = '35vh';
    public static readonly defaultHeadHeight = '40px';

    //
    // nested types
    //

    public static Head = GridHead;

    public static Body = GridBody;

    public static Footer = GridFooter;

    public static Cell = GridCell;

    //
    // component code
    //

    private headList = React.createRef<FixedSizeList>();
    private freezedColumnsList = React.createRef<FixedSizeList>();

    constructor(props: GridViewProps) {
        super(props);
        this.state = ({} as any);
    }

    public render() {
        const { columnCount, columnWidth, children, ...divProps } = this.props;
        return (
            <ErrorBoundary>
                <ThemeProvider theme={this.getTheme()}>
                    <StyledGridView
                        {...divProps}
                        style={Object.assign({}, this.props.style, utils.getHeights(divProps.style, GridView.defaultHeight))}
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
                                {utils.range(freezeColumns).map(index => this.renderHeadCell(cellRender, index))}

                                {/* main columns */}
                                <FixedSizeList
                                    ref={this.headList}
                                    style={{ overflow: 'hidden' }}
                                    layout="horizontal"
                                    height={height}
                                    width={width - freezeColumns * this.props.columnWidth}
                                    itemCount={this.props.columnCount - freezeColumns}
                                    itemSize={this.props.columnWidth}
                                >
                                    {({ index, style }) => this.renderHeadCell(cellRender, index + freezeColumns, style)}
                                </FixedSizeList>

                            </div>
                        )}
                    </AutoSizer>
                </ErrorBoundary>
            </StyledGridHead>
        );
    }

    private renderHeadCell(cellRender: HeadCellRender, columnIndex: number, style?: React.CSSProperties) {

        // create the cell
        const cell: any = cellRender(columnIndex);

        // get cell props & content
        const { props: cellProps, content: cellContent } = GridCell.extract(cell);

        // render
        return (
            <StyledGridHeadCell
                key={columnIndex}
                {...cellProps}
                style={Object.assign({ width: this.props.columnWidth }, cellProps.style, style)}
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
        const { children: cellRender, ...divProps } = body.props;

        const heights = this.getBodyHeights();
        const freezeColumns = this.props.freezeColumns || 0;

        return (
            <StyledGridBody
                {...divProps}
                style={Object.assign({}, divProps.style, {
                    direction: this.props.dir,
                    ...heights
                })}
            >
                <ErrorBoundary>
                    <AutoSizer>
                        {({ height, width }) => (
                            <div style={{ width, height, display: 'flex' }}>

                                {/* frozen first columns */}
                                <FixedSizeList
                                    ref={this.freezedColumnsList}
                                    style={{ overflow: 'hidden' }}
                                    height={height - scrollbarWidth}
                                    width={freezeColumns * this.props.columnWidth}
                                    itemCount={this.props.rowCount}
                                    itemSize={this.props.rowHeight}
                                >
                                    {({ index: rowIndex, style }) =>
                                        <div style={style}>
                                            {utils.range(freezeColumns)
                                                .map(columnIndex =>
                                                    this.renderBodyCell(cellRender, rowIndex, columnIndex)
                                                )}
                                        </div>
                                    }
                                </FixedSizeList>

                                <FixedSizeGrid
                                    height={height}
                                    width={width - freezeColumns * this.props.columnWidth}
                                    columnCount={this.props.columnCount - freezeColumns}
                                    columnWidth={this.props.columnWidth}
                                    rowCount={this.props.rowCount}
                                    rowHeight={this.props.rowHeight}
                                    onScroll={this.handleScroll}
                                >
                                    {({ rowIndex, columnIndex, style }) =>
                                        this.renderBodyCell(cellRender, rowIndex, columnIndex + freezeColumns, style)
                                    }
                                </FixedSizeGrid>
                            </div>
                        )}
                    </AutoSizer>
                </ErrorBoundary>
            </StyledGridBody>
        );
    }

    private renderBodyCell(cellRender: BodyCellRender, rowIndex: number, columnIndex: number, style?: React.CSSProperties) {

        // create the cell
        const cell: any = cellRender(rowIndex, columnIndex);

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

    private handleScroll = (e: GridOnScrollProps) => {
        if (this.freezedColumnsList.current) {
            this.freezedColumnsList.current.scrollTo(e.scrollTop);
        }
        if (this.headList.current) {
            this.headList.current.scrollTo(e.scrollLeft);
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
}