import { SizeCallback } from '../../types';
export declare type ElementType = 'column' | 'row';
export interface ElementInfo {
    index: number;
    position: number;
    size: number;
}
/**
 * Calculates the index, size and position of all visible items within a given
 * range.
 *
 * based on:
 * - https://github.com/bvaughn/react-window/blob/master/src/VariableSizeGrid.js
 * - https://github.com/fulcrumapp/react-virtual-grid/blob/master/src/grid-calculator.js
 * - https://github.com/ranneyd/sticky-table/blob/master/src/useVirtual.js
 */
export declare class WindowCalculator {
    private readonly data;
    elementsInRange(elementType: ElementType, fromPosition: number, toPosition: number, elementsOverscan: number, elementSize: number | SizeCallback, minElementsCountToReturn: number, totalElementsCount: number): ElementInfo[];
    getTotalSize(elementType: ElementType, elementSize: number | SizeCallback, estimatedElementSize: null | number, elementsCount: number): number;
    private findNearestItem;
    private findNearestItemBinarySearch;
    private findNearestItemExponentialSearch;
    private getElementInfo;
    private getSize;
}
