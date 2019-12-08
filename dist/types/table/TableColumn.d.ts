import * as React from 'react';
import { ColumnBody } from './ColumnBody';
import { ColumnHead } from './ColumnHead';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
export declare class TableColumnProps {
    children?: [React.SubComp<ColumnHead>, React.SubComp<ColumnBody>];
}
export declare class TableColumn extends React.PureComponent<TableColumnProps> {
    static createHeadFromColumns(columns: TableColumn[]): TableHead;
    static createBodyFromColumns(columns: TableColumn[]): TableBody;
}
