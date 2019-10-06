import { Theme } from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import { CustomScrollbars } from '../internals/CustomScrollbars';
import { asArray, ErrorBoundary, isNullOrUndefined, KeyEvent, Keys, ReactUtils, SizeUtils } from '../utils';
import { StyledTableBody, StyledTableHead, StyledTableView, TableBodyCell, TableBodyRow, TableHeadCell, TableHeadRow } from './style';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableColumn } from './TableColumn';
import { TableHead } from './TableHead';
import { RowRender, TableRow, TableRowProps } from './TableRow';

const scrollKeys: IMap<boolean> = {
    [Keys.PageUp]: true,
    [Keys.PageDown]: true,
    [Keys.End]: true,
    [Keys.Home]: true,
};

type TableChildren_RowsSyntax = [React.SubComp<TableHead>, React.SubComp<TableBody>];

type TableChildren_ColumnsSyntax = OneOrMore<React.SubComp<TableColumn>>;

/**
 * Applicable only on non-virtual tables.
 */
export const RowAutoSize = (): number => undefined;

export type RowKeyCallback = (index: number) => React.Key;

export class TableViewProps {

    //
    // main props
    //

    public isVirtual?: boolean;
    public rowCount: number;
    public rowKey?: RowKeyCallback;
    public children?: TableChildren_RowsSyntax | TableChildren_ColumnsSyntax;

    //
    // appearance
    //

    public dir?: DocDir = 'ltr';
    public className?: string;
    public style?: React.CSSProperties;
    /**
     * Row height in pixels.  
     * 
     * Default: 50
     */
    public rowHeight?: number | SizeCallback = 50;
    public emptyMessage?= "No Items to Display";
    public customScrollbars?: boolean;
    public hairlines?: boolean;

    //
    // behavior
    //

    public keyScroll?: boolean;

    //
    // virtualization
    //

    /**
     * Number of extra buffer items to render above/below the visible items.
     * Tweaking this can help reduce scroll flickering on certain
     * browsers/devices.  
     * 
     * Default: 20
     */
    public overscanCount?= 20;
}

export class TableView extends React.PureComponent<TableViewProps> {

    public static readonly defaultHeight = '35vh';
    public static readonly defaultHeadHeight = '40px';

    //
    // nested types
    //

    public static Head = TableHead;

    public static Body = TableBody;

    public static Row = TableRow;

    public static Cell = TableCell;

    public static Column = TableColumn;

    //
    // component code
    //

    public static defaultProps = new TableViewProps();

    private tableElement = React.createRef<VariableSizeList>();
    private tableInnerRef = React.createRef<HTMLElement>();
    private tableOuterRef = React.createRef<HTMLElement>();

    //
    // public methods
    //

    public refresh() {
        if (this.tableElement.current) {
            this.tableElement.current.resetAfterIndex(0, false);
        }
        this.forceUpdate();
    }

    //
    // render methods
    //

    public render() {

        // head & body
        let head = ReactUtils.singleChildOfType(this, TableHead);
        let body = ReactUtils.singleChildOfType(this, TableBody);
        const columns = ReactUtils.childrenOfType(this, TableColumn);

        // columns
        if (columns && columns.length) {
            if (head || body)
                throw new Error('Can not specify head and/or body when specifying table columns.');

            head = TableColumn.createHeadFromColumns(columns);
            body = TableColumn.createBodyFromColumns(columns);
        }

        // render
        return (
            <ErrorBoundary>
                <ThemeProvider theme={this.getTheme()}>
                    <StyledTableView
                        className={this.props.className}
                        style={{
                            ...this.props.style,
                            ...SizeUtils.geElementHeights(this, TableView.defaultHeight)
                        }}
                        {...this.getKeyScrollProps()}
                    >
                        {this.renderTableHead(head)}
                        {this.renderTableBody(head, body)}
                    </StyledTableView>
                </ThemeProvider>
            </ErrorBoundary>
        );
    }

    private renderTableHead(head: TableHead) {

        if (!head)
            return null;

        const { children, ...divProps } = head.props;

        return (

            <StyledTableHead
                {...divProps}
                style={{
                    direction: this.props.dir,
                    ...head.props.style,
                    ...SizeUtils.geElementHeights(head, TableView.defaultHeadHeight)
                }}
            >
                <TableHeadRow>
                    <ErrorBoundary>
                        {React.Children.map(children, (cell, index) => {

                            const headCell: TableCell = cell as any;
                            const cellProps = TableCell.getCellProps(headCell);
                            if (cellProps.visible === false)
                                return null;

                            const cellContent = TableCell.getCellContent(headCell);
                            return (
                                <TableHeadCell
                                    key={index}
                                    {...cellProps}
                                >
                                    <ErrorBoundary>
                                        {cellContent}
                                    </ErrorBoundary>
                                </TableHeadCell>
                            );
                        })}
                    </ErrorBoundary>
                </TableHeadRow>
            </StyledTableHead>
        );
    }

    private renderTableBody(head: TableHead, body: TableBody) {

        const bodyHeights = SizeUtils.getBodyHeights(this, head, {
            total: TableView.defaultHeight,
            head: TableView.defaultHeadHeight
        });

        return (
            <StyledTableBody
                style={{
                    direction: this.props.dir,
                    ...bodyHeights
                }}
            >
                <ErrorBoundary>
                    {this.renderTableRows(body)}
                </ErrorBoundary>
            </StyledTableBody>
        );
    }

    private renderTableRows(body: TableBody) {

        // placeholder
        if (this.props.rowCount === 0 || !TableBody.hasChildren(body)) {
            return this.renderItemsPlaceHolder();
        }

        // table rows
        const rowRender = body.props.children;
        return (
            <AutoSizer>
                {({ width, height }) => (
                    this.props.isVirtual !== false ?
                        this.renderTableRows_virtual(width, height, rowRender) :
                        this.renderTableRows_nonVirtual(width, height, rowRender)
                )}
            </AutoSizer>
        );
    }

    private renderTableRows_virtual(width: number, height: number, rowRender: RowRender) {
        return (
            <VariableSizeList
                ref={this.tableElement}
                innerRef={this.tableInnerRef}
                outerRef={this.tableOuterRef}
                style={{ outline: 'none' }}
                outerElementType={this.getOuterElementType()}
                direction={this.props.dir}
                layout="vertical"
                height={height}
                width={width}
                itemCount={this.props.rowCount}
                itemSize={this.getRowHeight}
                overscanCount={this.props.overscanCount}
            >
                {({ index, style }) => this.renderBodyRow(index, rowRender, style)}
            </VariableSizeList>
        );
    }

    private renderTableRows_nonVirtual(width: number, height: number, rowRender: RowRender) {
        return React.createElement(this.getOuterElementType() || 'div',
            {
                style: {
                    height,
                    width,
                    direction: this.props.dir,
                    outline: 'none',
                    overflow: 'auto',
                }
            } as any,
            (rowRender && (
                Array(this.props.rowCount).fill(0).map((_, index) => (
                    this.renderBodyRow(index, rowRender, { height: this.getRowHeight(index) })
                ))
            ))
        );
    }

    private renderBodyRow(index: number, rowRender: RowRender, style: React.CSSProperties) {
        if (!rowRender)
            return null;

        const row = rowRender(index);
        const { style: rowStyle, ...rowProps } = TableRow.getRowProps(row);
        const rowContent = TableRow.getRowContent(row);
        const rowKey = this.getRowKey(rowProps, index);

        return (
            <TableBodyRow
                style={{
                    ...style,
                    ...rowStyle
                }}
                key={rowKey}
                {...rowProps}
            >
                <ErrorBoundary>
                    {asArray(rowContent).map((cell, columnIndex) => {

                        const cellProps = TableCell.getCellProps(cell);
                        if (cellProps.visible === false)
                            return null;

                        return (
                            <TableBodyCell
                                key={columnIndex}
                                {...cellProps}
                            >
                                <ErrorBoundary>
                                    {TableCell.getCellContent(cell)}
                                </ErrorBoundary>
                            </TableBodyCell>
                        );
                    })}
                </ErrorBoundary>
            </TableBodyRow>
        );
    }

    private renderItemsPlaceHolder() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    {this.props.emptyMessage}
                </div>
            </div>
        );
    }

    //
    // scroll with keys
    //

    private getKeyScrollProps() {
        if (this.props.keyScroll === false)
            return {};
        return {
            onMouseEnter: this.registerKeyHandlers,
            onMouseLeave: this.removeKeyHandlers,
            onKeyDown: this.scrollByKey
        };
    }

    private registerKeyHandlers = () => {
        window.addEventListener('keydown', this.scrollByKey);
    }

    private removeKeyHandlers = () => {
        window.removeEventListener('keydown', this.scrollByKey);
    }

    private scrollByKey = ({ key }: KeyEvent) => {

        // https://dev.to/dance2die/scrolling-with-page-up-down-keys-in-react-window-31ei

        if (!scrollKeys[key])
            return;

        if (!this.tableElement.current || !this.tableInnerRef.current || !this.tableOuterRef.current)
            return;

        const scrollElement = (this.props.customScrollbars ? this.tableOuterRef.current : this.tableElement.current);
        const table = (ReactDOM.findDOMNode(scrollElement) as HTMLElement);
        const currentOffset = table.scrollTop;
        const bodyHeight = table.clientHeight;
        const pageSize = bodyHeight * 0.85;
        const minOffset = 0.1;
        const maxOffset = this.tableInnerRef.current.clientHeight;

        const offsetByKey: IMap<number> = {
            [Keys.PageUp]: Math.max(minOffset, currentOffset - pageSize),
            [Keys.PageDown]: Math.min(currentOffset + pageSize, maxOffset),
            [Keys.End]: maxOffset,
            [Keys.Home]: minOffset,
        };

        this.tableElement.current.scrollTo(offsetByKey[key]);
    }

    //
    // helpers
    //

    private getTheme(): Theme {
        return {
            dir: this.props.dir,
            hairlines: (this.props.hairlines !== false)
        };
    }

    private getRowKey(rowProps: TableRowProps, index: number): React.Key {

        if (!isNullOrUndefined(rowProps.key))
            return rowProps.key;

        if (typeof this.props.rowKey === 'function')
            return this.props.rowKey(index);

        return index;
    }

    private getRowHeight = (rowIndex: number): number => {
        if (typeof this.props.rowHeight === 'function')
            return this.props.rowHeight(rowIndex);
        return this.props.rowHeight;
    }

    private getOuterElementType() {
        return this.props.customScrollbars ? CustomScrollbars : undefined;
    }
}