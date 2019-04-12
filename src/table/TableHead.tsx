import * as React from 'react';
import { RowContent } from './TableRow';

export class TableHeadProps<T> {

    /**
     * Default: 40px
     */
    public height?= '40px';
    public children: RowContent<T>;
}

export class TableHead<T> extends React.PureComponent<TableHeadProps<T>> { }