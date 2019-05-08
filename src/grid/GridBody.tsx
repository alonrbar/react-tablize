import * as React from 'react';

export type BodyCellRender = (rowIndex: number, columnIndex: number) => React.ReactNode;

export interface GridBodyProps extends React.DivProps {
    children?: BodyCellRender;
}

export class GridBody extends React.PureComponent<GridBodyProps> { }