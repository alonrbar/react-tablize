import * as React from 'react';
import { RowContent } from './TableRow';
export interface TableHeadProps extends React.HTMLProps<HTMLDivElement> {
    children?: RowContent;
}
export declare class TableHead extends React.PureComponent<TableHeadProps> {
}
