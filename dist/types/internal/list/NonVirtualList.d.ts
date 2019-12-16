import * as React from 'react';
import { ListProps } from './List';
export declare class NonVirtualList extends React.PureComponent<ListProps> {
    private get isHorizontal();
    private disableScrollEvents;
    private readonly listRef;
    scrollTo: (scrollOffset: number) => void;
    render(): React.DetailedReactHTMLElement<{
        ref: React.RefObject<HTMLDivElement>;
        style: React.CSSProperties;
        onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
    }, HTMLDivElement>;
    private handleOnScroll;
    private getListElementType;
}
