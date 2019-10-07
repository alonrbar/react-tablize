import * as React from 'react';
import { TableBodyRow } from './style';
import { CellContent, TableCell } from './TableCell';
const flattenDeep = require('lodash.flattendeep');

const TableRowSymbol = '__ReactTablize__TableRow__';

export type RowContent = OneOrMore<React.SubComp<TableCell> | CellContent>;

export interface TableRowProps extends React.DivProps {
    children?: RowContent;
}

export class TableRow extends React.PureComponent<TableRowProps> {

    public static defaultProps: TableRowProps = {
        [TableRowSymbol as any]: true
    };

    public static isTableRow(row: any): row is React.ReactElement<TableRowProps> {
        return React.isValidElement(row) && (row.props as any)[TableRowSymbol];
    }

    public static getRowProps(row: unknown): TableRowProps {
        return (TableRow.isTableRow(row) && row.props) || {};
    }

    public static getRowContent(row: unknown): RowContent {

        let content: RowContent = row;

        // row element
        if (TableRow.isTableRow(content)) {
            content = content.props.children;
        }

        // actual content
        if (Array.isArray(content)) {
            content = flattenDeep(content);
        }
        return content;
    }

    public render() {
        return (
            <TableBodyRow
                className={this.props.className}
                style={this.props.style}
            >
                {this.props.children}
            </TableBodyRow>
        );
    }

}

export type RowRender = (index: number) => React.SubComp<TableRow> | RowContent;