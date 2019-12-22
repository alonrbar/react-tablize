import * as React from 'react';
import { DocDir, ScrollDirection, SizeCallback } from '../../types';
import { NormalizedScrollEvent } from '../utils';
export interface RenderWindowCellProps {
    colIndex: number;
    rowIndex: number;
    height: number;
    width: number;
}
export declare class VirtualWindowProps {
    direction?: DocDir;
    /**
     * Allow scrolling only via calling the `scrollTo` method.
     */
    controlledScroll?: boolean;
    scrollDirection?: ScrollDirection;
    height: number;
    width: number;
    columnCount: number;
    rowCount: number;
    columnWidth: number | SizeCallback;
    rowHeight: number | SizeCallback;
    overscanColumnsCount?: number;
    overscanRowCount?: number;
    /**
     * Tag name passed to `React.createElement` to create the inner "scrollable
     * area" element. This is an advanced property.
     */
    innerElementType?: React.ElementType;
    /**
     * Ref to attach to the inner "scrollable area" element. This is an advanced
     * property.
     */
    innerRef?: React.RefObject<any>;
    /**
     * Tag name passed to `React.createElement` to create the outer container
     * element. This is an advanced property.
     */
    outerElementType?: React.ElementType;
    /**
     * Ref to attach to the outer container element. This is an advanced property.
     */
    outerRef?: React.RefObject<any>;
    /**
     * We are only using classes for easier debug inspection...
     */
    className?: string;
    style?: React.CSSProperties;
    children: (props: RenderWindowCellProps) => React.ReactNode;
}
declare class VirtualWindowState {
    scrollTop: number;
    scrollLeft: number;
}
export declare class VirtualWindow extends React.PureComponent<VirtualWindowProps, VirtualWindowState> {
    static defaultProps: unknown;
    private get className();
    /**
     * Make sure to return a constant number of elements, this is important for
     * recycling purposes.
     */
    private minColumnsToRender;
    /**
     * Make sure to return a constant number of elements, this is important for
     * recycling purposes.
     */
    private minRowsToRender;
    private windowCalc;
    private recycler;
    private containerElement;
    constructor(props: VirtualWindowProps);
    scrollTo(e: NormalizedScrollEvent): void;
    getScrollableHeight(): number;
    getScrollableWidth(): number;
    clearCache(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: VirtualWindowProps): void;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    private renderCells;
    private renderCell;
    private handleScroll;
    private containerElementScroll;
    private setScrollState;
    private getCellOriginalKey;
}
export {};
