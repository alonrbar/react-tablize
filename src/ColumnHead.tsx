import * as React from 'react';
import { TableCell, CellContent } from './TableCell';

export class ColumnHeadProps<T> {

    /**
     * Default: 40px
     */
    public height?= '40px';
    public children: TableCell<T> | CellContent;
}

export class ColumnHead<T> extends React.PureComponent<ColumnHeadProps<T>> { }