import * as React from 'react';
import { ColumnBody } from './ColumnBody';
import { ColumnHead } from './ColumnHead';

export class TableColumnProps {
    public children?: [React.SubComp<ColumnHead>, React.SubComp<ColumnBody>];
}

export class TableColumn extends React.PureComponent<TableColumnProps> { }