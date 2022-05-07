import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ErrorBoundary } from '../internal/ErrorBoundary';
import { asArray, ElementHeights, isNullOrUndefined, ReactUtils, SizeUtils } from '../internal/utils';
import { List } from '../list';
import { DocDir, OneOrMore, SizeCallback, StyleProps } from '../types';
import * as style from './style';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableColumn } from './TableColumn';
import { TableContext } from './tableContext';
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

export class TableProps {

    //
    // main props
    //

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
    public defaultStyle?= true;
    public customScrollbars?: boolean;

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

export class Table extends React.PureComponent<TableProps> {

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

    public static defaultProps: unknown = new TableProps();

    private tableElement = React.createRef<List>();

    //
    // public methods
    //

    public refresh(): void {
        if (this.tableElement.current) {
            this.tableElement.current.refresh();
        }
        this.forceUpdate();
    }

    //
    // render methods
    //

    public render(): React.ReactNode {

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
                <div
                    className={this.props.className}
                    style={{
                        ...style.table(),
                        ...this.props.style,
                        ...SizeUtils.getElementHeights(this, Table.defaultHeight)
                    }}
                >
                    {this.renderHead(head)}
                    {this.renderBody(head, body)}
                </div>
            </ErrorBoundary>
        );
    }

    private renderHead(head: TableHead) {

        if (!head)
            return null;

        const { children, ...divProps } = head.props;

        const context = {
            theme: this.getTheme(),
            isHead: true,
        }

        return (
            <TableContext.Provider value={context}>
                <div
                    dir={this.props.dir as any}
                    {...divProps}
                    style={{
                        ...style.tableHead(this.getTheme()),
                        ...head.props.style,
                        ...SizeUtils.getElementHeights(head, Table.defaultHeadHeight)
                    }}
                >
                    {React.Children.map(children, this.renderCell)}
                </div>
            </TableContext.Provider>
        );
    }

    private renderBody(head: TableHead, body: TableBody) {

        const bodyHeights = this.getBodyHeights(this, head, {
            total: Table.defaultHeight,
            head: Table.defaultHeadHeight
        });

        const showPlaceholder = (this.props.rowCount === 0 || !TableBody.hasChildren(body));
        const rowRender = body?.props.children;

        const context = {
            theme: this.getTheme(),
            isHead: false,
        }

        return (
            <TableContext.Provider value={context}>
                <div
                    style={{
                        ...style.tableBody(),
                        direction: this.props.dir,
                        ...bodyHeights
                    }}
                >
                    <ErrorBoundary>
                        {showPlaceholder && this.renderRowsPlaceholder()}
                        {!showPlaceholder && (
                            <AutoSizer>
                                {({ width, height }) => (
                                    <List
                                        ref={this.tableElement}
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
                                    </List>
                                )}
                            </AutoSizer>
                        )}
                    </ErrorBoundary>
                </div>
            </TableContext.Provider>
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

    private renderRowsPlaceholder() {

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

    private getTheme(): style.Theme {
        return {
            dir: this.props.dir,
            defaultTheme: this.props.defaultStyle
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
    };

    private getBodyHeights(table: React.Component<StyleProps>, head: React.Component<StyleProps>, defaultHeights: TableHeights): ElementHeights {

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

    private getHeadHeight(head: React.Component<StyleProps>, defaultHeight: string | number): string | number {
        if (head) {
            return SizeUtils.getElementHeights(head, defaultHeight).height;
        }
        return 0;
    }
}