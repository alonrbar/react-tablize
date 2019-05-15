import * as React from 'react';

export interface BodyCellRenderArgs {
    rowIndex: number; 
    columnIndex: number;
    isScrolling?: boolean;
}

export type BodyCellRender = (args: BodyCellRenderArgs) => React.ReactNode;

export interface GridBodyProps extends React.DivProps {
    rowCount: number;
    /**
     * Body row height.  
     * To adjust the head height set the head `style` prop.
     */
    rowHeight: number | SizeCallback;
    children?: BodyCellRender;
}

export class GridBody extends React.PureComponent<GridBodyProps> { }