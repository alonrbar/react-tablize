import * as React from 'react';
import { TableCellProps } from './TableCell';

export interface ColumnHeadProps extends TableCellProps {
}

export class ColumnHead extends React.PureComponent<ColumnHeadProps> { }