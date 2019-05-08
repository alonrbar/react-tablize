import * as React from 'react';

export interface GridFooterProps extends React.DivProps {    
    children?: (columnIndex: number) => React.ReactNode;
}

export class GridFooter extends React.PureComponent<GridFooterProps> { }