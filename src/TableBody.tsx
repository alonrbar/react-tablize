import * as React from 'react';
import { RowType } from './TableBodyRow';

//
// body content
//

export type BodyContent<T> = RowType<T>;

//
// body component
//

export class TableBodyProps<T> {
    public children: BodyContent<T>;
}

export class TableBody<T> extends React.PureComponent<TableBodyProps<T>> { }