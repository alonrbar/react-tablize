import * as React from 'react';
import { ErrorBoundary } from '../internal/ErrorBoundary';
import { StyledTableCell } from './style';

const TableCellSymbol = '__ReactTablize__TableCell__';

export type CellContent = React.ReactNode;

export interface TableCellProps extends React.HTMLProps<HTMLDivElement> {
    children?: CellContent;
    visible?: boolean;
}

export class TableCell extends React.PureComponent<TableCellProps> {

    public static defaultProps: TableCellProps = {
        [TableCellSymbol as any]: true
    };

    public static isTableCell(cell: unknown): cell is React.ReactElement<TableCellProps> {
        return React.isValidElement(cell) && (cell.props as any)[TableCellSymbol];
    }

    public static getCellProps(cell: unknown): TableCellProps {
        return (TableCell.isTableCell(cell) && cell.props) || {};
    }

    public static getCellContent(cell: unknown): CellContent {
        return TableCell.isTableCell(cell) ?
            cell.props.children :
            cell;
    }

    public render() {
        return (
            <StyledTableCell {...this.props}>
                <ErrorBoundary>
                    {this.props.children}
                </ErrorBoundary>
            </StyledTableCell>
        );
    }
}

export interface CellRenderArgs {
    rowIndex: number;
    columnIndex: number;
}

export type CellRender = (args: CellRenderArgs) => TableCell | CellContent;