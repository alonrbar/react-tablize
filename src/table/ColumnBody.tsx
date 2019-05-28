import * as React from 'react';
import { CellRender } from './TableCell';

export class ColumnBodyProps {
    public children?: CellRender;
}

export class ColumnBody extends React.PureComponent<ColumnBodyProps> { }