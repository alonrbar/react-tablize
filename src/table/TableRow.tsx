import * as React from 'react';
import { TableCell, CellContent } from './TableCell';

export type RowContent<T> = OneOrMore<React.SubComp<TableCell<T>> | CellContent>;

export interface TableRowProps<T> extends React.DivProps {
    children?: RowContent<T>;
}

export class TableRow<T> extends React.PureComponent<TableRowProps<T>> { }

export type RowRender<T> = (item: T, itemIndex: number) => React.SubComp<TableRow<T>> | RowContent<T>;