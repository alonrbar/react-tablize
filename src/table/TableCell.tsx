import * as React from 'react';
import { ErrorBoundary } from '../internal/ErrorBoundary';
import * as style from './style';
import { TableContext } from './tableContext';

const TableCellSymbol = '__reacttablize__tablecell__';

export type CellContent = React.ReactNode;

export interface TableCellProps extends React.HTMLProps<HTMLDivElement> {
    children?: CellContent;
    visible?: boolean;
}

export class TableCell extends React.PureComponent<TableCellProps> {

    public static defaultProps: TableCellProps = {
        [TableCellSymbol as any]: "true"
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

    public render(): React.ReactNode {
        return (
            <TableContext.Consumer>
                {ctx => (
                    <div
                        {...this.props}
                        style={{
                            ...(ctx.isHead ? style.tableHeadCell(ctx.theme) : style.tableCell(ctx.theme)),
                            ...this.props.style
                        }}
                    >
                        <ErrorBoundary>
                            {this.props.children}
                        </ErrorBoundary>
                    </div>
                )}
            </TableContext.Consumer>
        );
    }
}

export interface CellRenderArgs {
    rowIndex: number;
    columnIndex: number;
}

export type CellRender = (args: CellRenderArgs) => TableCell | CellContent;