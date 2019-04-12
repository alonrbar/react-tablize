import * as React from 'react';
import { RowRender } from './TableRow';

export class TableBodyProps<T> {
    public children?: RowRender<T>;
}

export class TableBody<T> extends React.PureComponent<TableBodyProps<T>> { }