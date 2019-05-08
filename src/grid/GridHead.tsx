import * as React from 'react';

export interface GridHeadProps extends React.DivProps {    
    children?: (columnIndex: number) => React.ReactNode;
}

export class GridHead extends React.PureComponent<GridHeadProps> { }