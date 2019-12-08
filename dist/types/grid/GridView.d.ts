import * as React from 'react';
import { DocDir, SizeCallback } from '../types';
import { BodyCellRender, GridBody } from './GridBody';
import { GridHead } from './GridHead';
declare type GridChildren_FullSyntax = [React.SubComp<GridHead>, React.SubComp<GridBody>];
declare type GridChildren_PartialSyntax = React.SubComp<GridHead> | React.SubComp<GridBody>;
declare type GridChildren = GridChildren_FullSyntax | GridChildren_PartialSyntax | BodyCellRender;
export interface GridViewProps extends React.DivProps {
    columnCount: number;
    columnWidth: number | SizeCallback;
    freezeColumns?: number;
    dir?: DocDir;
    overscanRowsCount?: number;
    overscanColumnsCount?: number;
    children?: GridChildren;
}
export declare class GridView extends React.PureComponent<GridViewProps> {
    static readonly defaultHeight = "35vh";
    static readonly defaultHeadHeight = 40;
    static readonly defaultColumnWidth = 100;
    static readonly defaultRowHeight = 50;
    static Head: typeof GridHead;
    static Body: typeof GridBody;
    render(): JSX.Element;
    private renderGridCell;
    private renderHeadCell;
    private renderBodyCell;
    private getTheme;
    private getFrozenColumnsWidth;
    private getColumnWidth;
}
export {};
