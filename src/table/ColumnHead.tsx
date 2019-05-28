import * as React from 'react';
import { TableCell, CellContent } from './TableCell';

export class ColumnHeadProps {

    /**
     * Default: 40px
     */
    public height?= '40px';
    public children: TableCell | CellContent;
}

export class ColumnHead extends React.PureComponent<ColumnHeadProps> { }