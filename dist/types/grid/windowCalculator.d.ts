import { SizeCallback } from '../types';
export declare type ElementType = 'column' | 'row';
export interface ElementInfo {
    index: number;
    position: number;
    size: number;
}
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
