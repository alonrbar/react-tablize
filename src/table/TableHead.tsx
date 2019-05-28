import * as React from 'react';
import { RowContent } from './TableRow';

export class TableHeadProps {

    /**
     * Default: 40px
     */
    public height?= '40px';
    public children: RowContent;
}

export class TableHead extends React.PureComponent<TableHeadProps> { }