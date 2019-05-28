import * as React from 'react';
import { RowRender } from './TableRow';

export class TableBodyProps {
    public children?: RowRender;
}

export class TableBody extends React.PureComponent<TableBodyProps> { }