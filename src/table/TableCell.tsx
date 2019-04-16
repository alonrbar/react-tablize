import * as React from 'react';

export type CellContent = React.ReactNode;

export interface TableCellProps<T> extends React.DivProps {
    children?: CellContent;
    visible?: boolean;
}

export class TableCell<T> extends React.PureComponent<TableCellProps<T>> { }

export type CellRender<T> = (item: T, itemIndex: number, columnIndex: number) => TableCell<T> | CellContent;