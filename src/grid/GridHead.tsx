import * as React from 'react';

export interface HeadCellRenderArgs {
    columnIndex: number;
    isScrolling?: boolean;
}

export type HeadCellRender = (args: HeadCellRenderArgs) => React.ReactNode;

export interface GridHeadProps extends React.DivProps {    
    children?: HeadCellRender;
}

export class GridHead extends React.PureComponent<GridHeadProps> { }