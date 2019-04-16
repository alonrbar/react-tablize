import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { Theme } from '../styled';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import { ReactUtils } from '../utils/reactUtils';
import * as utils from '../utils/utils';
import { ColumnBody } from './ColumnBody';
import { ColumnHead } from './ColumnHead';
import { StyledTableBody, StyledTableBodyCell, StyledTableBodyRow, StyledTableHead, StyledTableHeadCell, StyledTableHeadRow, StyledTableView } from './style';
import { TableBody } from './TableBody';
import { CellContent, TableCell, TableCellProps } from './TableCell';
import { TableColumn } from './TableColumn';
import { TableHead, TableHeadProps } from './TableHead';
import { RowContent, TableRow, TableRowProps } from './TableRow';
const flattenDeep = require('lodash.flattendeep');

interface Heights {
    height: any;
    minHeight: any;
    maxHeight: any;
}

type RowsSyntaxChildren<T> = [React.SubComp<TableHead<T>>, React.SubComp<TableBody<T>>];

type ColumnsSyntaxChildren<T> = OneOrMore<React.SubComp<TableColumn<T>>>;

export type ItemIdCallback<T> = (item: T, index: number) => Id;

export class TableViewProps<T> {

    //
    // main props
    //

    public items: T[];
    public itemId?: ItemIdCallback<T>;
    public children?: RowsSyntaxChildren<T> | ColumnsSyntaxChildren<T>;

    //
    // appearance
    //

    public dir?: DocDir = 'ltr';
    public className?: string;
    public style?: React.CSSProperties;
    /**
     * Row height in pixels.  
     * Default: 50
     */
    public rowHeight?= 50;
    public emptyMessage?= "No Items to Display";

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

class TableViewState<T> {
    public selectedItems: IMap<T> = {};
}

export class TableView<T> extends React.PureComponent<TableViewProps<T>, TableViewState<T>> {

    public static readonly defaultHeight = '35vh';

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

    constructor(props: TableViewProps<T>) {
        super(props);
        this.state = new TableViewState<T>();
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

            head = this.createHeadFromColumns(columns);
            body = this.createBodyFromColumns(columns);
        }

        // render
        return (
            <ErrorBoundary>
                <ThemeProvider theme={this.getTheme()}>
                    <StyledTableView
                        className={this.props.className}
                        style={Object.assign({}, this.props.style, this.getHeights())}
                    >
                        {this.renderTableHead(head)}
                        {this.renderTableBody(head, body)}
                    </StyledTableView>
                </ThemeProvider>
            </ErrorBoundary>
        );
    }

    private renderTableHead(head: TableHead<T>) {

        if (!head)
            return null;

        return (

            <StyledTableHead style={{ height: head.props.height }}>
                <StyledTableHeadRow>
                    <ErrorBoundary>

                        {/* main columns */}
                        {React.Children.map(head.props.children, (cell, index) => {

                            const headCell: TableCell<T> = cell as any;
                            const cellProps = this.getHeadCellProps(headCell);
                            if (cellProps.visible === false)
                                return null;

                            const cellContent = this.getHeadCellContent(headCell);
                            return (
                                <StyledTableHeadCell
                                    key={index}
                                    {...cellProps}
                                >
                                    <ErrorBoundary>
                                        {cellContent}
                                    </ErrorBoundary>
                                </StyledTableHeadCell>
                            );
                        })}

                    </ErrorBoundary>
                </StyledTableHeadRow>
            </StyledTableHead>
        );
    }

    private renderTableBody(head: TableHead<T>, body: TableBody<T>) {

        const headProps = this.getHeadProps(head);
        const heightValues = this.getHeights();
        const bodyHeight = `calc(${heightValues.height} - ${headProps.height})`;
        const bodyMinHeight = `calc(${heightValues.minHeight} - ${headProps.height})`;
        const bodyMaxHeight = `calc(${heightValues.maxHeight} - ${headProps.height})`;

        return (
            <StyledTableBody
                style={{
                    direction: this.props.dir,
                    height: bodyHeight,
                    minHeight: bodyMinHeight,
                    maxHeight: bodyMaxHeight
                }}
            >
                <ErrorBoundary>
                    {this.renderTableRows(body)}
                </ErrorBoundary>
            </StyledTableBody>
        );
    }

    private renderTableRows(body: TableBody<T>) {

        // placeholder
        if (this.props.items.length === 0 || !this.hasBody(body)) {
            return this.renderItemsPlaceHolder();
        }

        // table rows
        return (
            <AutoSizer>
                {({ width, height }) => (
                    <FixedSizeList
                        style={{ outline: 'none' }}
                        direction={this.props.dir}
                        layout="vertical"
                        height={height}
                        width={width}
                        itemCount={this.props.items.length}
                        itemSize={this.props.rowHeight}
                    >
                        {({ index, style }) => {

                            const rowRender = body.props.children;
                            if (!rowRender)
                                return null;

                            const item = this.props.items[index];

                            const row = rowRender(item, index);
                            const { style: rowStyle, ...rowProps } = this.getRowProps(row);
                            const rowKey = this.getRowKey(rowProps, item, index);
                            const rowContent = this.getRowContent(row);

                            return (
                                <StyledTableBodyRow
                                    style={Object.assign({}, style, rowStyle || {})}
                                    key={rowKey}
                                    {...rowProps}
                                >
                                    <ErrorBoundary>

                                        {/* main columns */}
                                        {utils.asArray(rowContent).map((cell, columnIndex) => {

                                            const cellProps = this.getCellProps(cell);
                                            if (cellProps.visible === false)
                                                return null;

                                            return (
                                                <StyledTableBodyCell
                                                    key={columnIndex}
                                                    {...cellProps}
                                                >
                                                    <ErrorBoundary>
                                                        {this.getCellContent(cell)}
                                                    </ErrorBoundary>
                                                </StyledTableBodyCell>
                                            );
                                        })}

                                    </ErrorBoundary>
                                </StyledTableBodyRow>
                            );
                        }}
                    </FixedSizeList>
                )}
            </AutoSizer>
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

    private getTheme(): Theme {
        return {
            dir: this.props.dir
        };
    }

    private getHeights(): Heights {
        let height = (this.props.style || {}).height;
        let minHeight = (this.props.style || {}).minHeight;
        let maxHeight = (this.props.style || {}).maxHeight;

        if (height === undefined && minHeight === undefined) {
            height = TableView.defaultHeight;
        }

        height = utils.cssSizeString(height);
        minHeight = utils.cssSizeString(minHeight);
        maxHeight = utils.cssSizeString(maxHeight);

        return {
            height,
            minHeight,
            maxHeight
        };
    }

    //
    // item methods
    //

    private getItemId(item: T, index: number): Id {
        if (typeof this.props.itemId === 'function') {
            return this.props.itemId(item, index);
        } else {
            return (item as any).id;
        }
    }

    //
    // components structure handling
    //  

    private createHeadFromColumns(columns: TableColumn<T>[]): TableHead<T> {
        const head: any = (
            <TableHead>
                {columns.map(col => ReactUtils.singleChildOfType(col, ColumnHead).props.children)}
            </TableHead>
        );
        return head;
    }

    private createBodyFromColumns(columns: TableColumn<T>[]): TableBody<T> {
        const body: any = (
            <TableBody>
                {(item: T, itemIndex: number) => columns.map((col, columnIndex) => {
                    const cellRender = ReactUtils.singleChildOfType(col, ColumnBody).props.children;
                    if (!cellRender)
                        return null;
                    return cellRender(item, itemIndex, columnIndex);
                })}
            </TableBody>
        );
        return body;
    }

    private getHeadProps(head: TableHead<T>): TableHeadProps<T> {
        if (ReactUtils.elementInstanceOf(head, TableRow)) {
            return head.props;
        } else {
            return new TableHeadProps();
        }
    }

    private getHeadCellProps(cell: TableCell<T>): TableCellProps<T> {

        // cell element
        if (ReactUtils.elementInstanceOf(cell, TableCell))
            return cell.props || {};

        // default props
        return {};
    }

    private getHeadCellContent(cell: TableCell<T>): CellContent {

        if (ReactUtils.elementInstanceOf(cell, TableCell)) {
            return cell.props.children;
        }

        return cell;
    }

    private hasBody(body: TableBody<T>): boolean {

        if (!body)
            return false;

        if (utils.isNullOrUndefined(body.props.children))
            return false;

        if (typeof body.props.children === 'function')
            return true;

        if (Array.isArray(body.props.children))
            return body.props.children.length > 0;

        const childrenCount = React.Children.count(body.props.children);
        return childrenCount > 0;
    }

    private getRowProps(row: any): TableRowProps<T> {

        if (ReactUtils.elementInstanceOf(row, TableRow))
            return row.props || {};

        // default props
        return {};
    }

    private getRowContent(row: any): RowContent<T> {

        let content: RowContent<T> = row;

        // fragment element
        if (ReactUtils.isReactFragment(content)) {
            throw new Error('Can not use React.Fragment as row content. Consider wrapping your content with a row element.');
        }

        // row element
        if (ReactUtils.elementInstanceOf(content, TableRow)) {
            content = content.props.children;
        }

        // actual content
        if (Array.isArray(content)) {
            content = flattenDeep(content);
        }
        return content;
    }

    private getRowKey(rowProps: TableRowProps<T>, item: T, index: number): React.Key {

        if (!utils.isNullOrUndefined(rowProps.key))
            return rowProps.key;

        const itemId = this.getItemId(item, index);
        if (!utils.isNullOrUndefined(itemId))
            return itemId;

        return index;
    }

    private getCellProps(cell: any): TableCellProps<T> {

        // cell element
        if (ReactUtils.elementInstanceOf(cell, TableCell))
            return cell.props || {};

        // default props
        return {};
    }

    private getCellContent(cell: any): CellContent {

        let content = cell;

        // cell element
        if (ReactUtils.elementInstanceOf(content, TableCell)) {
            content = content.props.children;
        }

        // actual content
        return content || null;
    }
}