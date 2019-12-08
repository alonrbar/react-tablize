/// <reference types="react" />
export interface ElementHeights {
    height: string | number;
    minHeight: string | number;
    maxHeight: string | number;
}
export interface TableHeights {
    total: string | number;
    head: string | number;
}
export declare type ComponentWithStyle = React.Component<{
    style?: React.CSSProperties;
}>;
export declare class SizeUtils {
    static cssSizeString(size: any): string;
    static geElementHeights(component: ComponentWithStyle, defaultHeight: number | string): ElementHeights;
    static getBodyHeights(table: ComponentWithStyle, head: ComponentWithStyle, defaultHeights: TableHeights): ElementHeights;
    private static getHeadHeight;
}
