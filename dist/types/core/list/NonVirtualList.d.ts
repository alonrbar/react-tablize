import * as React from 'react';
import { ListProps } from './List';
export declare class NonVirtualList extends React.PureComponent<ListProps> {
    private get isHorizontal();
    private disableScrollEvents;
    private readonly listRef;
    scrollTo: (scrollOffset: number) => void;
    render(): JSX.Element;
    private handleOnScroll;
    private getListElementType;
}
