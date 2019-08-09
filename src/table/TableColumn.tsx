import * as React from 'react';
import { ReactUtils } from '../utils';
import { ColumnBody } from './ColumnBody';
import { ColumnHead } from './ColumnHead';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';

export class TableColumnProps {
    public children?: [React.SubComp<ColumnHead>, React.SubComp<ColumnBody>];
}

export class TableColumn extends React.PureComponent<TableColumnProps> { 

    public static createHeadFromColumns(columns: TableColumn[]): TableHead {

        if (columns.every(col => !ReactUtils.singleChildOfType(col, ColumnHead)))
            return null;

        const head: any = (
            <TableHead>
                {columns.map(col => {
                    const colHead = ReactUtils.singleChildOfType(col, ColumnHead);
                    if (!colHead)
                        return null;

                    // eslint-disable-next-line react/jsx-key
                    return <TableCell {...(colHead.props as any)} />;
                })}
            </TableHead>
        );
        return head;
    }

    public static createBodyFromColumns(columns: TableColumn[]): TableBody {
        const body: any = (
            <TableBody>
                {(rowIndex: number) => columns.map((col, columnIndex) => {
                    const cellRender = ReactUtils.singleChildOfType(col, ColumnBody).props.children;
                    if (!cellRender)
                        return null;
                    return cellRender({ rowIndex, columnIndex });
                })}
            </TableBody>
        );
        return body;
    }    
}