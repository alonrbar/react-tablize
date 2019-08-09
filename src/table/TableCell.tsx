import * as React from 'react';
import { ReactUtils } from '../utils';

export type CellContent = React.ReactNode;

export interface TableCellProps extends React.DivProps {
    children?: CellContent;
    visible?: boolean;
}

export class TableCell extends React.PureComponent<TableCellProps> {
    
    public static getCellProps(cell: unknown): TableCellProps {

        // cell element
        if (ReactUtils.elementInstanceOf(cell, TableCell))
            return cell.props || {};

        // default props
        return {};
    }

    public static getCellContent(cell: unknown): CellContent {

        if (ReactUtils.elementInstanceOf(cell, TableCell)) {
            return cell.props.children;
        }

        return cell;
    }
}

export interface CellRenderArgs {
    rowIndex: number;
    columnIndex: number;
}

export type CellRender = (args: CellRenderArgs) => TableCell | CellContent;