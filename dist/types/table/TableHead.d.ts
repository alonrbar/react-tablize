import * as React from 'react';
import { RowContent } from './TableRow';
export interface TableHeadProps extends React.DivProps {
    children?: RowContent;
}
export declare class TableHead extends React.PureComponent<TableHeadProps> {
}
