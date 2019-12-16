import * as React from 'react';
import { CustomScrollbars } from '../CustomScrollbars';
import { DomUtils } from '../utils';
import { RenderWindowCellProps, VirtualWindow, WindowCalculator } from '../window';
import { List, ListProps } from './List';

export interface VirtualListProps extends ListProps {
    keyScroll?: boolean;
}

export class VirtualList extends React.PureComponent<VirtualListProps> implements List {

    private get isHorizontal(): boolean {
        return this.props.layout === 'horizontal';
    }

    private windowRef = React.createRef<VirtualWindow>();

    private initialCalculator = new WindowCalculator();

    public refresh() {
        if (this.windowRef.current) {
            this.windowRef.current.clearCache();
        }
        this.forceUpdate();
    }

    public scrollTo(offset: number): void {
        if (this.windowRef.current) {

            const top = (this.isHorizontal ? undefined : offset);
            const left = (this.isHorizontal ? offset : undefined);

            this.windowRef.current.scrollTo({
                scrollTop: top,
                rawScrollLeft: left,
                normalizedScrollLeft: left
            });
        }
    }

    public render() {
        return (
            <VirtualWindow

                ref={this.windowRef}

                direction={this.props.dir}
                scrollDirection={this.isHorizontal ? 'horizontal' : 'vertical'}

                style={Object.assign({ outline: 'none' }, this.props.style)}
                outerElementType={this.getOuterElementType()}

                height={this.props.height}
                width={this.props.width}

                columnCount={this.isHorizontal ? this.props.itemCount : 1}
                rowCount={this.isHorizontal ? 1 : this.props.itemCount}

                columnWidth={this.isHorizontal ? this.props.itemSize : this.props.width - this.getVerticalScrollbarWidth()}
                rowHeight={this.isHorizontal ? this.props.height - this.getHorizontalScrollbarWidth() : this.props.itemSize}

                overscanColumnsCount={this.isHorizontal ? this.props.overscan : 0}
                overscanRowCount={this.isHorizontal ? 0 : this.props.overscan}
            >
                {cellProps => this.renderRow(cellProps)}
            </VirtualWindow>
        );
    }

    private renderRow(cellProps: RenderWindowCellProps) {
        const index = (this.props.layout === 'horizontal' ? cellProps.colIndex : cellProps.rowIndex);
        const row = this.props.children(index);

        return React.cloneElement(row, {
            style: {
                ...row.props.style
            }
        });
    }

    //
    // render helpers
    //

    private getVerticalScrollbarWidth(): number {
        const scrollableHeight = this.getScrollableHeight();
        const hasVerticalScrollbar = scrollableHeight > this.props.height;
        return (hasVerticalScrollbar && DomUtils.scrollbarWidth) || 0;
    }

    private getHorizontalScrollbarWidth(): number {
        const scrollableWidth = this.getScrollableWidth();
        const hasHorizontalScrollbar = scrollableWidth > this.props.width;
        return (hasHorizontalScrollbar && DomUtils.scrollbarWidth) || 0;
    }

    private getScrollableHeight() {
        if (this.windowRef.current)
            return this.windowRef.current.getScrollableHeight();

        // Body not rendered yet - have to calculate independently.  
        // Not so DRY, breaks encapsulation and not very efficient either but I
        // couldn't find a better way to do that which is not terribly ugly...
        return this.initialCalculator.getTotalSize(
            'row',
            this.props.itemSize,
            undefined,
            this.props.itemCount
        );
    }

    private getScrollableWidth() {
        if (this.windowRef.current)
            return this.windowRef.current.getScrollableWidth();

        // Body not rendered yet - have to calculate independently.  
        // Not so DRY, breaks encapsulation and not very efficient either but I
        // couldn't find a better way to do that which is not terribly ugly...
        return this.initialCalculator.getTotalSize(
            'column',
            this.props.itemSize,
            undefined,
            this.props.itemCount
        );
    }

    private getOuterElementType() {
        return this.props.customScrollbar ? CustomScrollbars : undefined;
    }
}