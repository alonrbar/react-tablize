import * as React from 'react';
import { SizeCallback } from '../types';

export interface BodyCellRenderArgs {
    rowIndex: number; 
    columnIndex: number;
}

export type BodyCellRender = (args: BodyCellRenderArgs) => React.ReactNode;

export interface GridBodyProps {
    rowCount: number;
    /**
     * Body row height.  
     * To adjust the head height set the head `style` prop.
     */
    rowHeight: number | SizeCallback;
    children?: BodyCellRender;
}

export class GridBody extends React.PureComponent<GridBodyProps> { }