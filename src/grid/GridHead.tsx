import * as React from 'react';

export type HeadCellRender = (columnIndex: number) => React.ReactNode;

export interface GridHeadProps extends React.DivProps {    
    children?: HeadCellRender;
}

export class GridHead extends React.PureComponent<GridHeadProps> { }