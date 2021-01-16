import * as React from 'react';
import { DocDir, SizeCallback } from '../types';
export interface ListRowProps {
    style?: React.CSSProperties;
}
export declare type ListRowRender = (index: number) => React.ReactElement<ListRowProps>;
export interface ListProps {
    style?: React.CSSProperties;
    dir: DocDir;
    layout?: 'horizontal' | 'vertical';
    height: number;
    width: number;
    itemCount: number;
    itemSize: SizeCallback;
    customScrollbar?: boolean;
    overscan?: number;
    onScroll?: (offset: number) => void;
    children: ListRowRender;
}
export declare class List extends React.PureComponent<ListProps> {
    private get isHorizontal();
    private windowRef;
    private initialCalculator;
    refresh(): void;
    scrollTo(offset: number): void;
    render(): React.ReactNode;
    private renderRow;
    private getVerticalScrollbarWidth;
    private getHorizontalScrollbarWidth;
    private getScrollableHeight;
    private getScrollableWidth;
    private getOuterElementType;
}
