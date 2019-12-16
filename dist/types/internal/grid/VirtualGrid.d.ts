import * as React from 'react';
import { VirtualGridProps } from './virtualGridProps';
declare class VirtualGridState {
    scrollTop: number;
    scrollLeft: number;
}
export declare class VirtualGrid extends React.PureComponent<VirtualGridProps, VirtualGridState> {
    static defaultProps: unknown;
    private get direction();
    private get activeTiles();
    private get headerTiles();
    private get bodyTiles();
    private get footerTiles();
    private tiles;
    private initialCalculator;
    constructor(props: VirtualGridProps);
    componentDidUpdate(prevProps: VirtualGridProps): void;
    render(): JSX.Element;
    private renderTilesRow;
    private renderTile;
    private handleScroll;
    private createTilesMap;
    private createTileMapEntryFactory;
    private getTilePosition;
    private resetTiles;
    private getContainerHeight;
    private getContainerWidth;
    private getScrollableHeight;
    private getScrollableWidth;
    private getBodyScrollableHeight;
    private getBodyScrollableWidth;
    private getVerticalScrollbarWidth;
    private getHorizontalScrollbarWidth;
    /**
     * We are only using classes for easier debug inspection...
     */
    private createClassName;
}
export {};
