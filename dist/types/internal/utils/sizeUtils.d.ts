import * as React from 'react';
export interface ElementHeights {
    height: string | number;
    minHeight: string | number;
    maxHeight: string | number;
}
export declare class SizeUtils {
    static cssSizeString(size: number | string): string;
    static getElementHeights(component: React.ComponentWithStyle, defaultHeight: number | string): ElementHeights;
}
