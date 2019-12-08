import * as React from 'react';
import { RowRender } from './TableRow';
export declare class TableBodyProps {
    children?: RowRender;
}
export declare class TableBody extends React.PureComponent<TableBodyProps> {
    static hasChildren(body: TableBody): boolean;
}
