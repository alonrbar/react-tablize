import * as React from 'react';
import { randomInt } from '../utils/utils';

const GridCellSymbol = '__ReactTablize__GridCell__' + randomInt(0);

export interface GridCellExtractResult {
    props: GridCellProps;
    content: React.ReactNode;
}

export interface GridCellProps extends React.DivProps {
}

export class GridCell extends React.PureComponent<GridCellProps> {

    public static defaultProps: GridCellProps = {
        [GridCellSymbol]: true
    };

    public static extract(cell: any): GridCellExtractResult {
        if (cell && cell.props && cell.props[GridCellSymbol]) {
            const { children: cellElemChildren, ...cellElemProps } = cell.props;
            return {
                props: cellElemProps,
                content: cellElemChildren
            };
        } else {
            return {
                props: {},
                content: cell
            };
        }
    }

    public render() {
        return this.props.children;
    }
}