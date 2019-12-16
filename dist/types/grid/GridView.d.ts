import * as React from 'react';
import { VirtualGridProps } from '../internal/grid';
export interface GridViewProps extends Omit<VirtualGridProps, 'height' | 'width'> {
    height?: string | number;
    width?: string | number;
}
export declare class GridView extends React.PureComponent<GridViewProps> {
    static readonly defaultHeight = "35vh";
    private get direction();
    render(): JSX.Element;
}
