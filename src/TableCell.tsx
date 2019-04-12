import * as React from 'react';

export type CellContent = React.ReactNode;

export class TableCellProps<T> {
    
    public children?: CellContent;
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

export type CellRender<T> = (item: T, itemIndex: number, columnIndex: number) => TableCell<T> | CellContent;