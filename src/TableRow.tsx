import * as React from 'react';
import { CellType } from './TableCell';

//
// row content
//

export type RowContent<T> = OneOrMore<CellType<T>>;

//
// row content render function
//

export interface RowContentRenderContext {
    itemIndex: number;
}

export type RowContentRender<T> = (item: T, context: RowContentRenderContext) => RowContent<T>;

//
// row component
//

export class TableRowProps<T> {

    public key?: React.Key;
    public className?: string;
    public style?: React.CSSProperties;
    public children: RowContent<T>;
}

export class TableRow<T> extends React.PureComponent<TableRowProps<T>> { }

//
// row component render function
//

export type RowRender<T> = (item: T, context: RowContentRenderContext) => TableRow<T>;

//
// row type
//

export type RowType<T> = RowRender<T> | TableRow<T> | RowContentRender<T> | RowContent<T>;