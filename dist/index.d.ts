import * as React from 'react';

// --------------------- //
//      TableView        //
// --------------------- //

//
// table head
//

export class TableHeadProps {
    height?: string;
    children: RowContent;
}

export class TableHead extends React.PureComponent<TableHeadProps> { }

//
// table body
//

export class TableBodyProps {
    children?: RowRender;
}

export class TableBody extends React.PureComponent<TableBodyProps> { }

//
// table row
//

export type RowContent = OneOrMore<SubComp<TableCell> | CellContent>;

export interface TableRowProps extends DivProps {
    children?: RowContent;
}

export class TableRow extends React.PureComponent<TableRowProps> { }

export type RowRender = (index: number) => SubComp<TableRow> | RowContent;

//
// table cell
//

export type CellContent = React.ReactNode;

export interface TableCellProps extends DivProps {
    children?: CellContent;
    visible?: boolean;
}

export class TableCell extends React.PureComponent<TableCellProps> { }

export interface CellRenderArgs {
    rowIndex: number;
    columnIndex: number;
}

export type CellRender = (args: CellRenderArgs) => TableCell | CellContent;

export type CellRender = (rowIndex: number, columnIndex: number) => TableCell | CellContent;

//
// table column
//

export class TableColumnProps {
    children?: [SubComp<ColumnHead>, SubComp<ColumnBody>];
}
export class TableColumn extends React.PureComponent<TableColumnProps> { }

//
// table column head
//

export interface ColumnHeadProps extends TableCellProps {
}

export class ColumnHead extends React.PureComponent<ColumnHeadProps> { }

//
// table column body
//

export class ColumnBodyProps {
    children?: CellRender;
}

export class ColumnBody extends React.PureComponent<ColumnBodyProps> { }

//
// table view
//

type TableChildren_RowsSyntax = [SubComp<TableHead>, SubComp<TableBody>];

type TableChildren_ColumnsSyntax = OneOrMore<SubComp<TableColumn>>;

export type RowKeyCallback = (index: number) => React.Key;

export class TableViewProps {
    isVirtual?: boolean;
    rowCount: number;
    rowKey?: RowKeyCallback;
    children?: TableChildren_RowsSyntax | TableChildren_ColumnsSyntax;
    dir?: DocDir;
    className?: string;
    style?: React.CSSProperties;
    /**
     * Row height in pixels.  
     * 
     * Default: 50
     */
    rowHeight?: number | SizeCallback;
    emptyMessage?: string;    
    customScrollbars?: boolean;
    hairlines?: boolean;
    keyScroll?: boolean;
    /**
     * Default: 20
     */
    overscanCount?: number;
    /**
     * Adds an additional isScrolling parameter to the children render function.
     * This parameter can be used to show a placeholder row or column while the
     * list is being scrolled.
     *
     * Note that using this parameter will result in an additional render call
     * after scrolling has stopped (when isScrolling changes from true to
     * false).
     */
    public useIsScrolling?: boolean;
}

export class TableView extends React.PureComponent<TableViewProps, TableViewState> {
    
    static readonly defaultHeight = "35vh";
    
    static Head: typeof TableHead;
    static Body: typeof TableBody;
    static Row: typeof TableRow;
    static Cell: typeof TableCell;
    static Column: typeof TableColumn;

    refresh(): void;
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
    /**
     * Number of columns to freeze (always the first columns).
     */
    freezeColumns?: number;    

    dir?: DocDir;

    /**
     * Number of extra rows to render above/below the visible items.
     * Tweaking this can help reduce scroll flickering on certain
     * browsers/devices.  
     * 
     * Default: 1
     */
    overscanRowsCount?: number;
    /**
     * Number of extra columns to render before/after the visible items.
     * Tweaking this can help reduce scroll flickering on certain
     * browsers/devices.  
     * 
     * Default: 1
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

type OneOrMore<T> = T | T[];

type DocDir = 'ltr' | 'rtl';

type SizeCallback = (index: number) => number;