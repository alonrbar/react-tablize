import * as React from 'react';
import { CustomScrollbars } from '../CustomScrollbars';
import { RenderWindowCellProps, VirtualWindow } from '../window';
import { List, ListProps } from './List';

export interface VirtualListProps extends ListProps {
    keyScroll?: boolean;
}

export class VirtualList extends React.PureComponent<VirtualListProps> implements List {

    private get isHorizontal(): boolean {
        return this.props.layout === 'horizontal';
    }

    private tableRef = React.createRef<VirtualWindow>();

    public refresh() {
        if (this.tableRef.current) {
            this.tableRef.current.clearCache();
        }
        this.forceUpdate();
    }

    public scrollTo(offset: number): void {
        if (this.tableRef.current) {

            const top = (this.isHorizontal ? undefined : offset);
            const left = (this.isHorizontal ? offset : undefined);

            this.tableRef.current.scrollTo({
                scrollTop: top,
                rawScrollLeft: left,
                normalizedScrollLeft: left
            });
        }
    }

    public render() {
        return (
            <VirtualWindow

                ref={this.tableRef}

                direction={this.props.dir}
                scrollDirection={this.isHorizontal ? 'horizontal' : 'vertical'}

                style={Object.assign({ outline: 'none' }, this.props.style)}
                outerElementType={this.getOuterElementType()}

                height={this.props.height}
                width={this.props.width}

                columnCount={this.isHorizontal ? this.props.itemCount : 1}
                rowCount={this.isHorizontal ? 1 : this.props.itemCount}

                columnWidth={this.isHorizontal ? this.props.itemSize : this.props.width}
                rowHeight={this.isHorizontal ? this.props.height : this.props.itemSize}

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

    private getOuterElementType() {
        return this.props.customScrollbar ? CustomScrollbars : undefined;
    }
}