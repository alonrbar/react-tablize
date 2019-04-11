import * as React from 'react';
import { CellType } from './TableCell';

export class TableColumnProps<T> {
    public header?: React.ReactNode;
    public children?: CellType<T>;
}

export class TableColumn<T> extends React.PureComponent<TableColumnProps<T>> {
    public render(): React.ReactNode {
        return null;
    }
}