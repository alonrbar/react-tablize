import * as React from 'react';
import { TableCell, CellContent } from './TableCell';

export type RowContent = OneOrMore<React.SubComp<TableCell> | CellContent>;

export interface TableRowProps extends React.DivProps {
    children?: RowContent;
}

export class TableRow extends React.PureComponent<TableRowProps> { }

export type RowRender = (index: number) => React.SubComp<TableRow> | RowContent;