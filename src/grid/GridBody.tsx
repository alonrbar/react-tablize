import * as React from 'react';

export type BodyCellRender = (rowIndex: number, columnIndex: number) => React.ReactNode;

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