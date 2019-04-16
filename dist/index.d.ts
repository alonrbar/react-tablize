import * as React from 'react';

//
// table head
//

export declare class TableHeadProps<T> {
    height?: string;
    children: RowContent<T>;
}

export declare class TableHead<T> extends React.PureComponent<TableHeadProps<T>> { }

//
// table body
//

export declare class TableBodyProps<T> {
    children?: RowRender<T>;
}

export declare class TableBody<T> extends React.PureComponent<TableBodyProps<T>> { }

//
// table row
//

export declare type RowContent<T> = OneOrMore<SubComp<TableCell<T>> | CellContent>;

export interface TableRowProps<T> extends React.DivProps {
    children?: RowContent<T>;
}

export declare class TableRow<T> extends React.PureComponent<TableRowProps<T>> { }

export declare type RowRender<T> = (item: T, itemIndex: number) => SubComp<TableRow<T>> | RowContent<T>;

//
// table cell
//

export declare type CellContent = React.ReactNode;

export interface TableCellProps<T> extends React.DivProps {
    children?: CellContent;
    visible?: boolean;
}

export declare class TableCell<T> extends React.PureComponent<TableCellProps<T>> { }

export declare type CellRender<T> = (item: T, itemIndex: number, columnIndex: number) => TableCell<T> | CellContent;

//
// table column
//

export declare class TableColumnProps<T> {
    children?: [SubComp<ColumnHead<T>>, SubComp<ColumnBody<T>>];
}
export declare class TableColumn<T> extends React.PureComponent<TableColumnProps<T>> { }

//
// table column head
//

export declare class ColumnHeadProps<T> {
    height?: string;
    children: TableCell<T> | CellContent;
}

export declare class ColumnHead<T> extends React.PureComponent<ColumnHeadProps<T>> { }

//
// table column body
//

export declare class ColumnBodyProps<T> {
    children?: CellRender<T>;
}

export declare class ColumnBody<T> extends React.PureComponent<ColumnBodyProps<T>> { }

//
// table view
//

declare type RowsSyntaxChildren<T> = [SubComp<TableHead<T>>, SubComp<TableBody<T>>];

declare type ColumnsSyntaxChildren<T> = OneOrMore<SubComp<TableColumn<T>>>;

export declare type ItemIdCallback<T> = (item: T, index: number) => Id;

export declare class TableViewProps<T> {
    items: T[];
    itemId?: ItemIdCallback<T>;
    children?: RowsSyntaxChildren<T> | ColumnsSyntaxChildren<T>;
    dir?: DocDir;
    className?: string;
    style?: React.CSSProperties;
    rowHeight?: number;
    emptyMessage?: string;
    overscanCount?: number;
}

export declare class TableView<T> extends React.PureComponent<TableViewProps<T>, TableViewState<T>> {
    
    static readonly defaultHeight = "35vh";
    
    static Head: typeof TableHead;
    static Body: typeof TableBody;
    static Row: typeof TableRow;
    static Cell: typeof TableCell;
    static Column: typeof TableColumn;
}

//
// misc
//

type SubComp<T> = T extends React.Component<infer P> ? React.ReactElement<P, any> : never;

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type Constructor<T> = new (...args: any[]) => T;

interface IMap<T> {
    [key: string]: T;
}

interface INestedMap<T> {
    [key: string]: IMap<T>;
}

type OneOrMore<T> = T | T[];

type Id = any;

interface IIdentifiable {
    id: Id;
}

type DocDir = 'ltr' | 'rtl';