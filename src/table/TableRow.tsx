import * as React from 'react';
import { ErrorBoundary } from '../internal/ErrorBoundary';
import { OneOrMore } from '../types';
import { StyledTableRow } from './style';
import { CellContent, TableCell } from './TableCell';
const flattenDeep = require('lodash.flattendeep');

const TableRowSymbol = '__ReactTablize__TableRow__';

/**
 * One or more cells.
 */
export type RowContent = OneOrMore<React.SubComp<TableCell> | CellContent>;

export interface TableRowProps extends React.HTMLProps<HTMLDivElement> {
    children?: RowContent;
}

export class TableRow extends React.PureComponent<TableRowProps> {

    public static defaultProps: unknown = {
        [TableRowSymbol as any]: true
    };

    public static isTableRow(row: unknown): row is React.ReactElement<TableRowProps> {
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

    public render(): React.ReactNode {
        return (
            <StyledTableRow
                {...this.props}
                index={this.props.key as number}
            >
                <ErrorBoundary>
                    {this.props.children}
                </ErrorBoundary>
            </StyledTableRow>
        );
    }
}

export type RowRender = (index: number) => React.SubComp<TableRow> | RowContent;