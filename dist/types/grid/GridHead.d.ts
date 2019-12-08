import * as React from 'react';
export interface HeadCellRenderArgs {
    columnIndex: number;
}
export declare type HeadCellRender = (args: HeadCellRenderArgs) => React.ReactNode;
export interface GridHeadProps {
    height?: number;
    children?: HeadCellRender;
}
export declare class GridHead extends React.PureComponent<GridHeadProps> {
}
