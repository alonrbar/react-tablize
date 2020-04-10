import * as React from 'react';
import { StyleProps } from '../../types';

export interface ElementHeights {
    height: string | number;
    minHeight: string | number;
    maxHeight: string | number;
}

export class SizeUtils {

    public static cssSizeString(size: number | string): string {
        if (Number.isFinite(size as number))
            return size + 'px';
        return size as string;
    }

    public static getElementHeights(component: React.Component<StyleProps>, defaultHeight: number | string): ElementHeights {
        const style = (component && component.props.style) || {};

        let height = style.height;
        let minHeight = style.minHeight;
        let maxHeight = style.maxHeight;

        if (height === undefined && minHeight === undefined) {
            height = defaultHeight;
        }

        height = this.cssSizeString(height);
        minHeight = this.cssSizeString(minHeight);
        maxHeight = this.cssSizeString(maxHeight);

        return {
            height,
            minHeight,
            maxHeight
        };
    }
}