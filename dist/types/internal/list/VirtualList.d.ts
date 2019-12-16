import * as React from 'react';
import { List, ListProps } from './List';
export interface VirtualListProps extends ListProps {
    keyScroll?: boolean;
}
export declare class VirtualList extends React.PureComponent<VirtualListProps> implements List {
    private get isHorizontal();
    private windowRef;
    private initialCalculator;
    refresh(): void;
    scrollTo(offset: number): void;
    render(): JSX.Element;
    private renderRow;
    private getVerticalScrollbarWidth;
    private getHorizontalScrollbarWidth;
    private getScrollableHeight;
    private getScrollableWidth;
    private getOuterElementType;
}
