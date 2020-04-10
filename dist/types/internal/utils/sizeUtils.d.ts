import * as React from 'react';
import { StyleProps } from '../../types';
export interface ElementHeights {
    height: string | number;
    minHeight: string | number;
    maxHeight: string | number;
}
export declare class SizeUtils {
    static cssSizeString(size: number | string): string;
    static getElementHeights(component: React.Component<StyleProps>, defaultHeight: number | string): ElementHeights;
}
