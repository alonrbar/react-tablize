import * as React from 'react';
import { CellRender } from './TableCell';

export class ColumnBodyProps<T> {
    public children?: CellRender<T>;
}

export class ColumnBody<T> extends React.PureComponent<ColumnBodyProps<T>> { }