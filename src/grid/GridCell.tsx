import * as React from 'react';
import { randomInt } from 'utils/utils';

const GridCellSymbol = '__ReactTablize__GridCell__' + randomInt(0);

export interface GridCellExtractResult {
    props: GridCellProps;
    content: React.ReactNode;
}

export interface GridCellProps extends React.DivProps {
    className?: string;
}

export class GridCell extends React.PureComponent<GridCellProps> {

    public static defaultProps: GridCellProps = {
        [GridCellSymbol]: true
    };

    public static extract(cell: any): GridCellExtractResult {

        if (cell && cell.props && cell.props[GridCellSymbol]) {

            let content: React.ReactNode;
            const { children: cellElemChildren, ...cellElemProps } = cell.props;

            // workaround for emotion's styled components
            if (cell.type && typeof cell.type.render === 'function') {
                content = cell.type.render.bind(cell);
            } else {
                content = cellElemChildren;
            }

            return {
                props: cellElemProps,
                content
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