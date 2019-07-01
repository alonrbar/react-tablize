
export interface ElementHeights {
    height: string | number;
    minHeight: string | number;
    maxHeight: string | number;
}

export interface TableHeights {
    total: string | number;
    head: string | number;
}

export type ComponentWithStyle = React.Component<{ style?: React.CSSProperties }>;

export class SizeUtils {

    public static geElementHeights(component: ComponentWithStyle, defaultHeight: number | string): ElementHeights {
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

    public static getBodyHeights(table: ComponentWithStyle, head: ComponentWithStyle, defaultHeights: TableHeights): ElementHeights {

        const totalHeights = this.geElementHeights(table, defaultHeights.total);
        const headHeight = this.getHeadHeight(head, defaultHeights.head);
        const bodyHeights = this.geElementHeights(table, undefined);

        let height = bodyHeights.height || totalHeights.height;
        let minHeight = bodyHeights.minHeight || totalHeights.minHeight;
        let maxHeight = bodyHeights.maxHeight || totalHeights.maxHeight;

        if (headHeight) {
            height = `calc(${height} - ${headHeight})`;
            if (minHeight)
                minHeight = `calc(${minHeight} - ${headHeight})`;
            if (maxHeight)
                maxHeight = `calc(${maxHeight} - ${headHeight})`;
        }

        return {
            height,
            minHeight,
            maxHeight
        };
    }

    private static getHeadHeight(head: ComponentWithStyle, defaultHeight: string | number): string | number {
        if (head) {
            return this.geElementHeights(head, defaultHeight).height;
        }
        return 0;
    }

    public static cssSizeString(size: any): string {
        if (Number.isFinite(size))
            return size + 'px';
        return size;
    }
    
}