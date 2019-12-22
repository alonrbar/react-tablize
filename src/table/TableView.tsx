import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ErrorBoundary } from '../internal/ErrorBoundary';
import { List, NonVirtualList, VirtualList } from '../internal/list';
import { asArray, ElementHeights, isNullOrUndefined, ReactUtils, SizeUtils } from '../internal/utils';
import { DocDir, OneOrMore, SizeCallback } from '../types';
import { StyledTableBody, StyledTableHead, StyledTableView } from './style';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableColumn } from './TableColumn';
import { TableHead } from './TableHead';
import { RowRender, TableRow, TableRowProps } from './TableRow';

interface TableHeights {
    total: string | number;
    head: string | number;
}

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
    public placeholder?: React.ReactNode;
    public customScrollbars?: boolean;

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

    public static defaultProps: unknown = new TableViewProps();

    private tableElement = React.createRef<List>();

    //
    // public methods
    //

    public refresh() {
        if (this.tableElement.current) {
            this.tableElement.current.refresh();
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
                <StyledTableView
                    className={this.props.className}
                    style={{
                        ...this.props.style,
                        ...SizeUtils.getElementHeights(this, TableView.defaultHeight)
                    }}
                >
                    {this.renderTableHead(head)}
                    {this.renderTableBody(head, body)}
                </StyledTableView>
            </ErrorBoundary>
        );
    }

    private renderTableHead(head: TableHead) {

        if (!head)
            return null;

        const { children, ...divProps } = head.props;

        return (
            <StyledTableHead
                dir={this.props.dir as any}
                {...divProps}
                style={{
                    ...head.props.style,
                    ...SizeUtils.getElementHeights(head, TableView.defaultHeadHeight)
                }}
            >
                {React.Children.map(children, this.renderCell)}
            </StyledTableHead>
        );
    }

    private renderTableBody(head: TableHead, body: TableBody) {

        const bodyHeights = this.getBodyHeights(this, head, {
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
        const ListComponent = this.getListComponent();
        return (
            <AutoSizer>
                {({ width, height }) => (
                    <ListComponent
                        ref={this.tableElement as React.Ref<any>}
                        style={{ outline: 'none' }}
                        dir={this.props.dir}
                        layout="vertical"
                        height={height}
                        width={width}
                        itemCount={this.props.rowCount}
                        itemSize={this.getRowHeight}
                        overscan={this.props.overscanCount}
                        customScrollbar={this.props.customScrollbars}
                    >
                        {index => this.renderBodyRow(index, rowRender)}
                    </ListComponent>
                )}
            </AutoSizer>
        );
    }

    private renderBodyRow(index: number, rowRender: RowRender) {
        if (!rowRender)
            return null;

        const row = rowRender(index);
        let rowContent = TableRow.getRowContent(row);
        rowContent = asArray(rowContent).map(this.renderCell);

        // already a row - just adjust the content
        if (TableRow.isTableRow(row)) {
            const rowKey = this.getRowKey(row.props, index);
            return React.cloneElement(row, { key: rowKey }, rowContent);
        }

        // not a row - wrap content with row element
        else {
            const rowKey = this.getRowKey({}, index);
            return (
                <TableRow key={rowKey}>
                    {rowContent}
                </TableRow>
            );
        }
    }

    private renderCell(cell: unknown, columnIndex: number) {
        const cellProps = TableCell.getCellProps(cell);
        if (cellProps.visible === false)
            return null;

        // already a cell - just add key and return
        if (TableCell.isTableCell(cell)) {
            return React.cloneElement(cell, { key: columnIndex });
        }

        // not a cell - wrap content with cell element
        return (
            <TableCell key={columnIndex}>
                {cell}
            </TableCell>
        );
    }

    private renderItemsPlaceHolder() {
        
        if (this.props.placeholder)
            return this.props.placeholder;

        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    No Items to Display
                </div>
            </div>
        );
    }

    //
    // helpers
    //

    private getListComponent() {
        return this.props.isVirtual !== false ?
            VirtualList :
            NonVirtualList;
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
    };

    private getBodyHeights(table: React.ComponentWithStyle, head: React.ComponentWithStyle, defaultHeights: TableHeights): ElementHeights {

        const totalHeights = SizeUtils.getElementHeights(table, defaultHeights.total);
        const headHeight = this.getHeadHeight(head, defaultHeights.head);
        const bodyHeights = SizeUtils.getElementHeights(table, undefined);

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

    private getHeadHeight(head: React.ComponentWithStyle, defaultHeight: string | number): string | number {
        if (head) {
            return SizeUtils.getElementHeights(head, defaultHeight).height;
        }
        return 0;
    }
}