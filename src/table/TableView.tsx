import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import { Theme } from '../styled';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import { ReactUtils } from '../utils/reactUtils';
import * as utils from '../utils/utils';
import { ColumnBody } from './ColumnBody';
import { ColumnHead } from './ColumnHead';
import { CustomScrollbars } from './CustomScrollbars';
import {
    LineNumberBodyCell,
    LineNumberHeadCell,
    StyledTableBody,
    StyledTableHead,
    StyledTableView,
    TableBodyCell,
    TableBodyRow,
    TableHeadCell,
    TableHeadRow
} from './style';
import { TableBody } from './TableBody';
import { CellContent, TableCell, TableCellProps } from './TableCell';
import { TableColumn } from './TableColumn';
import { TableHead, TableHeadProps } from './TableHead';
import { RowContent, RowRender, TableRow, TableRowProps } from './TableRow';
const flattenDeep = require('lodash.flattendeep');

interface Heights {
    height: any;
    minHeight: any;
    maxHeight: any;
}

type TableChildren_RowsSyntax = [React.SubComp<TableHead>, React.SubComp<TableBody>];

type TableChildren_ColumnsSyntax = OneOrMore<React.SubComp<TableColumn>>;

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
    public lineNumbers?: boolean;
    public customScrollbars?: boolean;
    public hairlines?: boolean;

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

    private renderTableHead(head: TableHead) {

        if (!head)
            return null;

        return (

            <StyledTableHead style={{ height: head.props.height }}>
                <TableHeadRow>
                    <ErrorBoundary>

                        {/* line number column */}
                        {this.props.lineNumbers && (
                            <LineNumberHeadCell />
                        )}

                        {/* main columns */}
                        {React.Children.map(head.props.children, (cell, index) => {

                            const headCell: TableCell = cell as any;
                            const cellProps = this.getHeadCellProps(headCell);
                            if (cellProps.visible === false)
                                return null;

                            const cellContent = this.getHeadCellContent(headCell);
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

    private renderTableRows(body: TableBody) {

        // placeholder
        if (this.props.rowCount === 0 || !this.hasBody(body)) {
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
                style={{ outline: 'none' }}
                outerElementType={this.getOuterElementType()}
                direction={this.props.dir}
                layout="vertical"
                height={height}
                width={width}
                itemCount={this.props.rowCount}
                itemSize={this.getRowHeight}
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
            },
            (rowRender && (
                Array(this.props.rowCount).fill(0).map((_, index) => (
                    this.renderBodyRow(index, rowRender, { height: this.getRowHeight(index) })
                ))
            ))
        );
    }

    private renderBodyRow(index: number, rowRender: RowRender, style?: React.CSSProperties) {
        if (!rowRender)
            return null;

        const row = rowRender(index);
        const { style: rowStyle, ...rowProps } = this.getRowProps(row);
        const rowKey = this.getRowKey(rowProps, index);
        const rowContent = this.getRowContent(row);

        return (
            <TableBodyRow
                style={Object.assign({}, style, rowStyle)}
                key={rowKey}
                {...rowProps}
            >
                <ErrorBoundary>

                    {/* line number column */}
                    {this.props.lineNumbers && (
                        <LineNumberBodyCell>
                            {index + 1}
                        </LineNumberBodyCell>
                    )}

                    {/* main columns */}
                    {utils.asArray(rowContent).map((cell, columnIndex) => {

                        const cellProps = this.getCellProps(cell);
                        if (cellProps.visible === false)
                            return null;

                        return (
                            <TableBodyCell
                                key={columnIndex}
                                {...cellProps}
                            >
                                <ErrorBoundary>
                                    {this.getCellContent(cell)}
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
    // components structure handling
    //  

    private createHeadFromColumns(columns: TableColumn[]): TableHead {

        if (columns.every(col => !ReactUtils.singleChildOfType(col, ColumnHead)))
            return null;

        const head: any = (
            <TableHead>
                {columns.map(col => {
                    const colHead = ReactUtils.singleChildOfType(col, ColumnHead);
                    if (!colHead)
                        return null;

                    // eslint-disable-next-line react/jsx-key
                    return <TableCell {...(colHead.props as any)} />;
                })}
            </TableHead>
        );
        return head;
    }

    private createBodyFromColumns(columns: TableColumn[]): TableBody {
        const body: any = (
            <TableBody>
                {(rowIndex: number) => columns.map((col, columnIndex) => {
                    const cellRender = ReactUtils.singleChildOfType(col, ColumnBody).props.children;
                    if (!cellRender)
                        return null;
                    return cellRender({ rowIndex, columnIndex });
                })}
            </TableBody>
        );
        return body;
    }

    private getHeadProps(head: TableHead): TableHeadProps {
        if (ReactUtils.elementInstanceOf(head, TableRow)) {
            return head.props;
        } else {
            return new TableHeadProps();
        }
    }

    private getHeadCellProps(cell: TableCell): TableCellProps {

        // cell element
        if (ReactUtils.elementInstanceOf(cell, TableCell))
            return cell.props || {};

        // default props
        return {};
    }

    private getHeadCellContent(cell: TableCell): CellContent {

        if (ReactUtils.elementInstanceOf(cell, TableCell)) {
            return cell.props.children;
        }

        return cell;
    }

    private hasBody(body: TableBody): boolean {

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

    private getRowProps(row: any): TableRowProps {

        if (ReactUtils.elementInstanceOf(row, TableRow))
            return row.props || {};

        // default props
        return {};
    }

    private getRowContent(row: any): RowContent {

        let content: RowContent = row;

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

    private getRowKey(rowProps: TableRowProps, index: number): React.Key {

        if (!utils.isNullOrUndefined(rowProps.key))
            return rowProps.key;

        if (typeof this.props.rowKey === 'function')
            return this.props.rowKey(index);

        return index;
    }

    private getCellProps(cell: any): TableCellProps {

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

    //
    // helpers
    //

    private getTheme(): Theme {
        return {
            dir: this.props.dir,
            hairlines: (this.props.hairlines !== false)
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

    private getRowHeight = (rowIndex: number): number => {
        if (typeof this.props.rowHeight === 'function')
            return this.props.rowHeight(rowIndex);
        return this.props.rowHeight;
    }

    private getOuterElementType() {
        return this.props.customScrollbars ? CustomScrollbars : undefined;
    }
}