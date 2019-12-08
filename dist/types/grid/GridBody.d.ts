import * as React from 'react';
import { SizeCallback } from '../types';
export interface BodyCellRenderArgs {
    rowIndex: number;
    columnIndex: number;
}
export declare type BodyCellRender = (args: BodyCellRenderArgs) => React.ReactNode;
export interface GridBodyProps {
    rowCount: number;
    rowHeight: number | SizeCallback;
    children?: BodyCellRender;
}
export declare class GridBody extends React.PureComponent<GridBodyProps> {
}
