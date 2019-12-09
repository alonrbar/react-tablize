import { SizeCallback } from '../types';
export declare type ElementType = 'column' | 'row';
export interface ElementInfo {
    index: number;
    position: number;
    size: number;
}
export declare class WindowCalculator {
    private readonly data;
    elementsInRange(elementType: ElementType, fromPosition: number, toPosition: number, elementsOverscan: number, estimatedElementSize: number, calculateElementSize: SizeCallback, minElementsCountToReturn: number, totalElementsCount: number): ElementInfo[];
    getEstimatedTotalSize(elementType: ElementType, estimatedElementSize: number, elementsCount: number): number;
    private findNearestItem;
    private findNearestItemBinarySearch;
    private findNearestItemExponentialSearch;
    private getElementInfo;
}
