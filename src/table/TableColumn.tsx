import * as React from 'react';
import { ColumnBody } from './ColumnBody';
import { ColumnHead } from './ColumnHead';

export class TableColumnProps<T> {
    public children?: [React.SubComp<ColumnHead<T>>, React.SubComp<ColumnBody<T>>];
}

export class TableColumn<T> extends React.PureComponent<TableColumnProps<T>> { }