import * as React from 'react';

const TableCellSymbol = '__ReactTablize__TableCell__';

export type CellContent = React.ReactNode;

export interface TableCellProps extends React.DivProps {
    children?: CellContent;
    visible?: boolean;
}

export class TableCell extends React.PureComponent<TableCellProps> {

    public static defaultProps: TableCellProps = {
        [TableCellSymbol as any]: true
    };

    public static isTableCell(cell: any): cell is TableCell {
        return cell && cell.props && cell.props[TableCellSymbol];
    }

    public static getCellProps(cell: unknown): TableCellProps {
        return (TableCell.isTableCell(cell) && cell.props) || {};
    }

    public static getCellContent(cell: unknown): CellContent {
        return TableCell.isTableCell(cell) ?
            cell.props.children :
            cell;
    }
}

export interface CellRenderArgs {
    rowIndex: number;
    columnIndex: number;
}

export type CellRender = (args: CellRenderArgs) => TableCell | CellContent;