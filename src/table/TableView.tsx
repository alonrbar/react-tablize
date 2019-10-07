import { Theme } from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { List, NonVirtualList, VirtualList } from '../internals';
import { asArray, ErrorBoundary, isNullOrUndefined, ReactUtils, SizeUtils } from '../utils';
import { StyledTableBody, StyledTableHead, StyledTableView, TableBodyCell, TableBodyRow, TableHeadCell, TableHeadRow } from './style';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableColumn } from './TableColumn';
import { TableHead } from './TableHead';
import { RowRender, TableRow, TableRowProps } from './TableRow';

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
                <ThemeProvider theme={this.getTheme()}>
                    <StyledTableView
                        className={this.props.className}
                        style={{
                            ...this.props.style,
                            ...SizeUtils.geElementHeights(this, TableView.defaultHeight)
                        }}
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
        const ListComponent = this.props.isVirtual !== false ?
            VirtualList :
            NonVirtualList;
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
        const { style: rowStyle, ...rowProps } = TableRow.getRowProps(row);
        const rowContent = TableRow.getRowContent(row);
        const rowKey = this.getRowKey(rowProps, index);

        return (
            <TableBodyRow
                style={rowStyle}
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
}