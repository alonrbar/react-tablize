import { IMap, SizeCallback } from '../types';

// based on:
// https://github.com/bvaughn/react-window/blob/master/src/VariableSizeGrid.js
// https://github.com/fulcrumapp/react-virtual-grid/blob/master/src/grid-calculator.js
// https://github.com/ranneyd/sticky-table/blob/master/src/useVirtual.js

export type ElementType = 'column' | 'row';

export interface ElementInfo {
    index: number;
    basePosition: number;
    size: number;
}

class CalcData {
    public cache: IMap<ElementInfo> = {};
    public lastMeasuredIndex = -1;
}

type CalcDataMap = {
    [key in ElementType]: CalcData;
};

export class WindowCalculator {

    private readonly data: CalcDataMap = {
        column: new CalcData(),
        row: new CalcData()
    };

    //
    // public methods
    //

    public elementsInRange(
        elementType: ElementType,
        fromPosition: number,
        toPosition: number,
        elementsOverscan: number,
        estimatedElementSize: number,
        calculateElementSize: SizeCallback,
        minElementsCountToReturn: number,
        totalElementsCount: number
    ) {

        let fromIndex = this.findNearestItem(
            elementType,
            fromPosition,
            totalElementsCount,
            estimatedElementSize,
            calculateElementSize
        );
        fromIndex = Math.max(0, fromIndex - elementsOverscan);

        let toIndex = this.findNearestItem(
            elementType,
            toPosition,
            totalElementsCount,
            estimatedElementSize,
            calculateElementSize
        );
        toIndex = Math.min(toIndex + elementsOverscan, totalElementsCount - 1);
        
        while (toIndex - fromIndex + 1 < minElementsCountToReturn) {
            if (toIndex + 1 < totalElementsCount) {
                toIndex++;
            } else {
                fromIndex--;
            }
        }

        const info: ElementInfo[] = [];
        for (let i = fromIndex; i <= toIndex; i++) {
            info.push(this.getElementInfo(
                elementType,
                i,
                estimatedElementSize,
                calculateElementSize
            ));
        }
        return info;
    }

    public getEstimatedTotalSize(elementType: ElementType, estimatedElementSize: number, elementsCount: number) {

        let { lastMeasuredIndex } = this.data[elementType];
        const { cache } = this.data[elementType];

        // Edge case check for when the number of items decreases while a scroll is in progress.
        // https://github.com/bvaughn/react-window/pull/138
        if (lastMeasuredIndex >= elementsCount) {
            lastMeasuredIndex = elementsCount - 1;
        }

        let totalSizeOfMeasuredElements = 0;
        if (lastMeasuredIndex >= 0) {
            const lastMeasuredElemInfo = cache[lastMeasuredIndex];
            totalSizeOfMeasuredElements = lastMeasuredElemInfo.basePosition + lastMeasuredElemInfo.size;
        }

        const numUnmeasuredElements = elementsCount - lastMeasuredIndex - 1;
        const totalSizeOfUnmeasuredElements = numUnmeasuredElements * estimatedElementSize;

        return totalSizeOfMeasuredElements + totalSizeOfUnmeasuredElements;
    }

    //
    // private methods
    //

    private findNearestItem(
        elementType: ElementType,
        position: number,
        maxIndex: number,
        estimatedElementSize: number,
        calculateElementSize: SizeCallback
    ) {

        const { lastMeasuredIndex, cache } = this.data[elementType];
        const lastMeasuredPosition = cache[lastMeasuredIndex]?.basePosition ?? -1;

        if (lastMeasuredPosition >= position) {

            // If we've already measured items within this range just use a binary search as it's faster.
            return this.findNearestItemBinarySearch(
                elementType,
                lastMeasuredIndex,
                0,
                position,
                estimatedElementSize,
                calculateElementSize
            );

        } else {

            // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
            // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
            // The overall complexity for this approach is O(log n).
            return this.findNearestItemExponentialSearch(
                elementType,
                Math.max(lastMeasuredIndex, 0),
                maxIndex,
                position,
                estimatedElementSize,
                calculateElementSize
            );
        }
    };

    private findNearestItemBinarySearch(
        elementType: ElementType,
        high: number,
        low: number,
        position: number,
        estimatedElementSize: number,
        calculateElementSize: SizeCallback
    ) {
        while (low <= high) {
            const middle = low + Math.floor((high - low) / 2);
            const currentPosition = this.getElementInfo(elementType, middle, estimatedElementSize, calculateElementSize).basePosition;

            if (currentPosition === position) {
                return middle;
            } else if (currentPosition < position) {
                low = middle + 1;
            } else if (currentPosition > position) {
                high = middle - 1;
            }
        }

        if (low > 0) {
            return low - 1;
        } else {
            return 0;
        }
    };

    private findNearestItemExponentialSearch(
        elementType: ElementType,
        index: number,
        maxIndex: number,
        position: number,
        estimatedElementSize: number,
        calculateElementSize: SizeCallback
    ) {
        let interval = 1;

        while (
            index < maxIndex &&
            this.getElementInfo(elementType, index, estimatedElementSize, calculateElementSize).basePosition < position
        ) {
            index += interval;
            interval *= 2;
        }

        return this.findNearestItemBinarySearch(
            elementType,
            Math.min(index, maxIndex - 1),
            Math.floor(index / 2),
            position,
            estimatedElementSize,
            calculateElementSize
        );
    };

    private getElementInfo(
        elementType: ElementType,
        elementIndex: number,
        estimatedElementSize: number,
        calculateElementSize: SizeCallback
    ) {

        const { lastMeasuredIndex, cache } = this.data[elementType];

        // fill missing cache entries
        if (elementIndex > lastMeasuredIndex) {

            let position = 0;

            // skipped already cached entries
            if (lastMeasuredIndex !== -1) {
                const elementInfo = cache[lastMeasuredIndex];
                position = elementInfo.basePosition + elementInfo.size;
            }

            // add new cache entries
            for (let index = (lastMeasuredIndex + 1); index <= elementIndex; index++) {
                const size = cache[index]?.size ?? calculateElementSize?.(index) ?? estimatedElementSize;

                cache[index] = {
                    index,
                    basePosition: position,
                    size,
                };

                position += size;
            }

            this.data[elementType].lastMeasuredIndex = elementIndex;
        }

        return cache[elementIndex];
    }
}