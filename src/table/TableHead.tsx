import * as React from 'react';
import { RowContent } from './TableRow';

export interface TableHeadProps extends React.DivProps {
    children?: RowContent;
}

export class TableHead extends React.PureComponent<TableHeadProps> { }