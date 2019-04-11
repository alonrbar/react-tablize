import * as React from 'react';

//
// cell content
//

export type CellContent = React.ReactNode;

//
// cell content render function
//

export interface CellContentRenderContext {
    columnIndex: number;
    itemIndex: number;
}

export type CellContentRender<T> = (item: T, context: CellContentRenderContext) => CellContent;

//
// cell component
//

export class TableCellProps<T> {
    
    public children?: CellContent | CellContentRender<T>;
    public className?: string;
    public style?: React.CSSProperties;
    public title?: string;
    public visible? = true;
    public onClick?: VoidFunction;

    constructor(initial?: Partial<TableCellProps<T>>) {
        Object.assign(this, initial);
    }
}

export class TableCell<T> extends React.PureComponent<TableCellProps<T>> { }

//
// cell component render function
//

export type CellRender<T> = (item: T, context: CellContentRenderContext) => TableCell<T>;

//
// cell type
//

export type CellType<T> = CellRender<T> | TableCell<T> | CellContentRender<T> | CellContent;