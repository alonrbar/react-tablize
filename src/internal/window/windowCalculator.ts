import { IMap, SizeCallback } from '../../types';

export type ElementType = 'column' | 'row';

export interface ElementInfo {
    index: number;
    position: number;
    size: number;
}

class CalcData {
    public cache: IMap<ElementInfo> = {};
    public lastMeasuredIndex = -1;
    public lastFromPosition = -1;
}

type CalcDataMap = {
    [key in ElementType]: CalcData;
};

/**
 * Calculates the index, size and position of all visible items within a given
 * range.
 *
 * based on:
 * - https://github.com/bvaughn/react-window/blob/master/src/VariableSizeGrid.js
 * - https://github.com/fulcrumapp/react-virtual-grid/blob/master/src/grid-calculator.js
 * - https://github.com/ranneyd/sticky-table/blob/master/src/useVirtual.js
 */
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
        elementSize: number | SizeCallback,
        minElementsCountToReturn: number,
        totalElementsCount: number
    ) {

        let fromIndex = this.findNearestItem(
            elementType,
            fromPosition,
            totalElementsCount,
            elementSize
        );

        let toIndex = this.findNearestItem(
            elementType,
            toPosition,
            totalElementsCount,
            elementSize
        );

        // Determine scroll direction and set overscan accordingly
        if (fromPosition < this.data[elementType].lastFromPosition) {
            fromIndex -= elementsOverscan;
        } else {
            toIndex += elementsOverscan;
        }
        this.data[elementType].lastFromPosition = fromPosition;

        // Enforce "minElementsCountToReturn"
        while (toIndex - fromIndex + 1 < minElementsCountToReturn) {
            if (toIndex + 1 < totalElementsCount) {
                toIndex++;
            } else {
                fromIndex--;
            }
        }

        // Prevent range error
        fromIndex = Math.max(0, fromIndex);
        toIndex = Math.min(toIndex, totalElementsCount - 1);

        // Get elements info
        const info: ElementInfo[] = [];
        for (let i = fromIndex; i <= toIndex; i++) {
            info.push(this.getElementInfo(
                elementType,
                i,
                elementSize
            ));
        }
        return info;
    }

    public getTotalSize(
        elementType: ElementType,
        elementSize: number | SizeCallback,
        estimatedElementSize: null | number,
        elementsCount: number
    ) {

        // Handle unmeasured elements
        let lastMeasuredIndex: number;
        let totalSizeOfUnmeasuredElements = 0;
        if (typeof elementSize === "function" && !estimatedElementSize) {

            // Dynamic element size and no estimation - force evaluation of all unmeasured elements.
            this.getElementInfo(elementType, elementsCount - 1, elementSize);

            // Update last measured index after evaluation
            lastMeasuredIndex = Math.min(this.data[elementType].lastMeasuredIndex, elementsCount - 1);

        } else {

            // Constant element size - use simple multiplication for unmeasured elements.
            lastMeasuredIndex = Math.min(this.data[elementType].lastMeasuredIndex, elementsCount - 1);
            const numUnmeasuredElementsCount = elementsCount - lastMeasuredIndex - 1;
            const elementSizeOrEstimate = typeof elementSize === "number" ? elementSize : estimatedElementSize;
            totalSizeOfUnmeasuredElements = numUnmeasuredElementsCount * elementSizeOrEstimate;
        }

        // Get total size of already measured elements
        let totalSizeOfMeasuredElements = 0;
        if (lastMeasuredIndex >= 0) {
            const { cache } = this.data[elementType];
            const lastMeasuredElemInfo = cache[lastMeasuredIndex];
            totalSizeOfMeasuredElements = lastMeasuredElemInfo.position + lastMeasuredElemInfo.size;
        }

        // Sum and return
        return totalSizeOfMeasuredElements + totalSizeOfUnmeasuredElements;
    }

    //
    // private methods
    //

    private findNearestItem(
        elementType: ElementType,
        position: number,
        maxIndex: number,
        elementSize: number | SizeCallback
    ) {

        const { lastMeasuredIndex, cache } = this.data[elementType];
        const lastMeasuredPosition = cache[lastMeasuredIndex]?.position ?? -1;

        if (lastMeasuredPosition >= position) {

            // If we've already measured items within this range just use a binary search as it's faster.
            return this.findNearestItemBinarySearch(
                elementType,
                lastMeasuredIndex,
                0,
                position,
                elementSize
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
                elementSize
            );
        }
    };

    private findNearestItemBinarySearch(
        elementType: ElementType,
        high: number,
        low: number,
        position: number,
        elementSize: number | SizeCallback
    ) {
        while (low <= high) {
            const middle = low + Math.floor((high - low) / 2);
            const currentPosition = this.getElementInfo(elementType, middle, elementSize).position;

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
        elementSize: number | SizeCallback
    ) {
        let interval = 1;

        while (
            index < maxIndex &&
            this.getElementInfo(elementType, index, elementSize).position < position
        ) {
            index += interval;
            interval *= 2;
        }

        return this.findNearestItemBinarySearch(
            elementType,
            Math.min(index, maxIndex - 1),
            Math.floor(index / 2),
            position,
            elementSize
        );
    };

    private getElementInfo(
        elementType: ElementType,
        elementIndex: number,
        elementSize: number | SizeCallback
    ) {

        const { lastMeasuredIndex, cache } = this.data[elementType];

        // fill missing cache entries
        if (elementIndex > lastMeasuredIndex) {

            let position = 0;

            // skipped already cached entries
            if (lastMeasuredIndex !== -1) {
                const elementInfo = cache[lastMeasuredIndex];
                position = elementInfo.position + elementInfo.size;
            }

            // add new cache entries
            for (let index = (lastMeasuredIndex + 1); index <= elementIndex; index++) {
                const size = this.getSize(index, elementSize, cache[index]?.size);

                cache[index] = {
                    index,
                    position,
                    size,
                };

                position += size;
            }

            this.data[elementType].lastMeasuredIndex = elementIndex;
        }

        return cache[elementIndex];
    }

    private getSize(index: number, elementSize: number | SizeCallback, cache: number): number {

        if (cache !== null && cache !== undefined)
            return cache;

        if (typeof elementSize === "number")
            return elementSize;

        if (typeof elementSize === "function")
            return elementSize(index);

        throw new Error(
            `Invalid argument '${nameof(elementSize)}' expected a number or a function ` +
            `but received '${typeof elementSize}': ${elementSize}.`
        );
    }
}