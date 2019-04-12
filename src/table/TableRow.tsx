import * as React from 'react';
import { TableCell, CellContent } from './TableCell';

export type RowContent<T> = OneOrMore<React.SubComp<TableCell<T>> | CellContent>;

export class TableRowProps<T> {

    public key?: React.Key;
    public className?: string;
    public style?: React.CSSProperties;
    public children: RowContent<T>;
}

export class TableRow<T> extends React.PureComponent<TableRowProps<T>> { }

export type RowRender<T> = (item: T, itemIndex: number) => React.SubComp<TableRow<T>> | RowContent<T>;