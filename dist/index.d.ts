import * as React from 'react';

// --------------------- //
//      TableView        //
// --------------------- //

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

export interface TableRowProps<T> extends DivProps {
    children?: RowContent<T>;
}

export declare class TableRow<T> extends React.PureComponent<TableRowProps<T>> { }

export declare type RowRender<T> = (item: T, itemIndex: number) => SubComp<TableRow<T>> | RowContent<T>;

//
// table cell
//

export declare type CellContent = React.ReactNode;

export interface TableCellProps<T> extends DivProps {
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

declare type TableChildren_RowsSyntax<T> = [SubComp<TableHead<T>>, SubComp<TableBody<T>>];

declare type TableChildren_ColumnsSyntax<T> = OneOrMore<SubComp<TableColumn<T>>>;

export declare type ItemIdCallback<T> = (item: T, index: number) => Id;

export declare class TableViewProps<T> {
    items: T[];
    itemId?: ItemIdCallback<T>;
    children?: TableChildren_RowsSyntax<T> | TableChildren_ColumnsSyntax<T>;
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

// -------------------- //
//      GridView        //
// -------------------- //

//
// grid head
//

export interface HeadCellRenderArgs {
    columnIndex: number;
    isScrolling?: boolean;
}

export type HeadCellRender = (args: HeadCellRenderArgs) => React.ReactNode;

export interface GridHeadProps extends React.DivProps {    
    children?: HeadCellRender;
}

export class GridHead extends React.PureComponent<GridHeadProps> { }

//
// grid body
//

export interface BodyCellRenderArgs {
    rowIndex: number; 
    columnIndex: number;
    isScrolling?: boolean;
}

export type BodyCellRender = (args: BodyCellRenderArgs) => React.ReactNode;

export interface GridBodyProps extends React.DivProps {
    rowCount: number;
    rowHeight: number | SizeCallback;
    children?: BodyCellRender;
}

export class GridBody extends React.PureComponent<GridBodyProps> { }

//
// grid footer
//

// TODO...

//
// grid cell
//

export interface GridCellExtractResult {
    props: GridCellProps;
    content: React.ReactNode;
}

export interface GridCellProps extends React.DivProps {
}

export class GridCell extends React.PureComponent<GridCellProps> {
    public static extract(cell: any): GridCellExtractResult;
}

//
// grid view
//

type GridChildren_FullSyntax = [React.SubComp<GridHead>, React.SubComp<GridBody>];
type GridChildren = GridChildren_FullSyntax | BodyCellRender;

export interface GridViewProps extends React.DivProps {

    columnCount: number;
    columnWidth: number | SizeCallback;
    freezeColumns?: number;    

    dir?: DocDir;

    /**
     * Number of extra rows to render above/below the visible items.
     * Tweaking this can help reduce scroll flickering on certain
     * browsers/devices.  
     * 
     * Default: 20
     */
    overscanRowsCount?: number;
    /**
     * Number of extra columns to render before/after the visible items.
     * Tweaking this can help reduce scroll flickering on certain
     * browsers/devices.  
     * 
     * Default: 20
     */
    overscanColumnsCount?: number;
    /**
     * Adds an additional isScrolling parameter to the children render function.
     * This parameter can be used to show a placeholder row or column while the
     * list is being scrolled.
     *
     * Note that using this parameter will result in an additional render call
     * after scrolling has stopped (when isScrolling changes from true to
     * false).
     */
    useIsScrolling?: boolean;

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
}

// ----------------- //
//       misc        //
// ----------------- //

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

type DocDir = 'ltr' | 'rtl';

type SizeCallback = (index: number) => number;