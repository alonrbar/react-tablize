import * as classNames from 'classnames';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { TableBody } from './TableBody';
import { CellContent, CellContentRender, CellContentRenderContext, CellRender, CellType, TableCell, TableCellProps } from './TableCell';
import { TableColumn } from './TableColumn';
import { TableHead, TableHeadProps } from './TableHead';
import { RowContent, RowContentRender, RowContentRenderContext, RowRender, RowType, TableRow, TableRowProps } from './TableRow';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { ReactUtils } from './utils/reactUtils';
import * as utils from './utils/utils';
const flattenDeep = require('lodash.flattendeep');

const tableClass = 'table-view';

interface Heights {
    height: any;
    minHeight: any;
    maxHeight: any;
}

export type ItemIdCallback<T> = (item: T, index: number) => Id;

export class TableViewProps<T> {

    //
    // main props
    //

    public items: T[];
    public itemId?: ItemIdCallback<T>;

    //
    // appearance
    //

    public dir: CssDir = 'ltr';
    public className?: string;
    public style?: React.CSSProperties;
    /**
     * Row height in pixels.  
     * Default: 50
     */
    public rowHeight?= 50;
    /**
     * Default: true
     */
    public lineNumber?= true;
    public emptyMessage? = "No Items to Display";

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
                <div
                    className={classNames(tableClass, this.props.className)}
                    style={Object.assign({}, this.props.style, this.getHeights())}
                >
                    {this.renderTableHead(head)}
                    {this.renderTableBody(head, body)}
                </div>
            </ErrorBoundary>
        );
    }

    private renderTableHead(head: TableHead<T>) {

        if (!head)
            return null;

        return (

            <div className={`${tableClass}-head`} style={{ height: head.props.height }}>
                <div className={`${tableClass}-head-row`}>
                    <ErrorBoundary>

                        {/* number column */}
                        {this.props.lineNumber && (
                            <div className={`${tableClass}-head-cell ${tableClass}-index-column`}></div>
                        )}

                        {/* main columns */}
                        {React.Children.map(head.props.children, (cell, index) => {

                            const headCell: TableCell<T> = cell as any;
                            const cellProps = this.getHeadCellProps(headCell);
                            if (!cellProps.visible)
                                return null;

                            const cellContent = this.getHeadCellContent(headCell);
                            return (
                                <div key={index} className={classNames(`${tableClass}-head-cell`, cellProps.className)} style={cellProps.style}>
                                    <ErrorBoundary>
                                        {cellContent}
                                    </ErrorBoundary>
                                </div>
                            );
                        })}

                    </ErrorBoundary>
                </div>
            </div>
        );
    }

    private renderTableBody(head: TableHead<T>, body: TableBody<T>) {

        const headProps = this.getHeadProps(head);
        const heightValues = this.getHeights();
        const bodyHeight = `calc(${heightValues.height} - ${headProps.height})`;
        const bodyMinHeight = `calc(${heightValues.minHeight} - ${headProps.height})`;
        const bodyMaxHeight = `calc(${heightValues.maxHeight} - ${headProps.height})`;

        return (
            <div
                className={`${tableClass}-body`}
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
            </div>
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
                        style={{ direction: this.props.dir, outline: 'none' }}
                        direction="vertical"
                        height={height}
                        width={width}
                        itemCount={this.props.items.length}
                        itemSize={this.props.rowHeight}
                    >
                        {({ index, style }) => {

                            const rowRenderContext = { itemIndex: index };

                            const item = this.props.items[index];
                            const row = body.props.children;
                            const rowProps = this.getRowProps(row, item, rowRenderContext);

                            const rowKey = this.getRowKey(rowProps, item, index);
                            const rowContent = this.getRowContent(row, item, rowRenderContext);

                            return (
                                <div
                                    className={classNames(`${tableClass}-body-row`, rowProps.className)}
                                    style={Object.assign({}, style, rowProps.style || {})}
                                    key={rowKey}
                                >
                                    <ErrorBoundary>

                                        {/* number column */}
                                        {this.props.lineNumber && (
                                            <div className={`${tableClass}-body-cell ${tableClass}-index-column`}>{index + 1}</div>
                                        )}

                                        {/* main columns */}
                                        {utils.asArray(rowContent).map((cell, columnIndex) => {

                                            const cellRenderContext = { itemIndex: index, columnIndex };

                                            const cellProps = this.getCellProps(cell, item, cellRenderContext);
                                            if (!cellProps.visible)
                                                return null;

                                            return (
                                                <div
                                                    key={columnIndex}
                                                    className={classNames(`${tableClass}-body-cell`, cellProps.className)}
                                                    style={cellProps.style}
                                                    title={cellProps.title}
                                                    onClick={cellProps.onClick}
                                                >
                                                    <ErrorBoundary>
                                                        {this.getCellContent(cell, item, cellRenderContext)}
                                                    </ErrorBoundary>
                                                </div>
                                            );
                                        })}

                                    </ErrorBoundary>
                                </div>
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
                <div
                    className={`${tableClass}-placeholder padding-lg`}
                    style={{ textAlign: 'center' }}
                >
                    {this.props.emptyMessage}
                </div>
            </div>
        );
    }

    private getHeights(): Heights {
        let height = (this.props.style || {}).height;
        const minHeight = (this.props.style || {}).minHeight;
        const maxHeight = (this.props.style || {}).maxHeight;

        if (height === undefined && minHeight === undefined) {
            height = TableView.defaultHeight;
        }
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
                {columns.map(col => col.props.header || null)}
            </TableHead>
        );
        return head;
    }

    private createBodyFromColumns(columns: TableColumn<T>[]): TableBody<T> {
        const body: any = (
            <TableBody>
                {columns.map(col => col.props.children)}
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
        if (ReactUtils.elementInstanceOf(cell, TableCell)) {
            return new TableCellProps(cell.props);
        }
        return new TableCellProps();
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

    private getRowProps(row: RowType<T>, item: T, context: RowContentRenderContext): TableRowProps<T> {

        // row element render
        if (typeof row === 'function')
            row = (row as RowRender<T>)(item, context);

        // row element
        if (ReactUtils.elementInstanceOf(row, TableRow))
            return row.props;

        // default props
        return new TableRowProps();
    }

    private getRowContent(row: RowType<T>, item: T, context: RowContentRenderContext): RowContent<T> {

        let content: RowContent<T> = row;

        // row element render
        if (typeof content === 'function')
            content = (content as RowRender<T>)(item, context);

        // fragment element
        if (ReactUtils.isReactFragment(content)) {
            throw new Error('Can not use React.Fragment as row content. Consider wrapping your content with a row element.');
        }

        // row element
        if (ReactUtils.elementInstanceOf(content, TableRow)) {

            content = content.props.children;

            // row content render
            if (typeof content === 'function') {
                content = (content as RowContentRender<T>)(item, context);
            }
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

    private getCellProps(cell: CellType<T>, item: T, context: CellContentRenderContext): TableCellProps<T> {

        // cell render - function that creates a cell element
        if (typeof cell === 'function')
            cell = (cell as CellRender<T>)(item, context);

        // cell element
        if (ReactUtils.elementInstanceOf(cell, TableCell))
            return new TableCellProps(cell.props);

        // default props
        return new TableCellProps();
    }

    private getCellContent(cell: CellType<T>, item: T, context: CellContentRenderContext): CellContent {

        let content = cell;

        // cell render - function that creates a cell element
        if (typeof content === 'function')
            content = (content as CellRender<T>)(item, context);

        // cell element
        if (ReactUtils.elementInstanceOf(content, TableCell)) {
            content = content.props.children;
        }

        // cell content render - function that creates cell content
        if (typeof content === 'function')
            content = (content as CellContentRender<T>)(item, context);

        // actual content
        return content || null;
    }
}