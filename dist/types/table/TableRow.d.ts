import * as React from 'react';
import { OneOrMore } from '../types';
import { CellContent, TableCell } from './TableCell';
export declare type RowContent = OneOrMore<React.SubComp<TableCell> | CellContent>;
export interface TableRowProps extends React.DivProps {
    children?: RowContent;
}
export declare class TableRow extends React.PureComponent<TableRowProps> {
    static defaultProps: TableRowProps;
    static isTableRow(row: unknown): row is React.ReactElement<TableRowProps>;
    static getRowProps(row: unknown): TableRowProps;
    static getRowContent(row: unknown): RowContent;
    render(): JSX.Element;
}
export declare type RowRender = (index: number) => React.SubComp<TableRow> | RowContent;
