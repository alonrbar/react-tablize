import * as React from 'react';
import { isNullOrUndefined } from '../internal/utils';
import { RowRender } from './TableRow';

export class TableBodyProps {
    public children?: RowRender;
}

export class TableBody extends React.PureComponent<TableBodyProps> {

    public static hasChildren(body: TableBody): boolean {
        if (!body)
            return false;

        if (isNullOrUndefined(body.props.children))
            return false;

        if (typeof body.props.children === 'function')
            return true;

        if (Array.isArray(body.props.children))
            return body.props.children.length > 0;

        const childrenCount = React.Children.count(body.props.children);
        return childrenCount > 0;
    }
}