import * as React from 'react';
import { List, ListProps } from './List';
export interface VirtualListProps extends ListProps {
    keyScroll?: boolean;
}
export declare class VirtualList extends React.PureComponent<VirtualListProps> implements List {
    private tableRef;
    private tableInnerRef;
    private tableOuterRef;
    refresh(): void;
    scrollTo(offset: number): void;
    render(): JSX.Element;
    private renderRow;
    private getKeyScrollProps;
    private registerKeyHandlers;
    private removeKeyHandlers;
    private scrollByKey;
    private getOuterElementType;
}
