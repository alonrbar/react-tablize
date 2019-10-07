import * as React from 'react';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview/web';
import { range } from '../../utils';
import { List, ListProps } from '../List';

export class VirtualList extends React.PureComponent<ListProps> implements List {

    private get isHorizontal(): boolean {
        return this.props.layout === 'horizontal';
    }

    private readonly listRef = React.createRef<RecyclerListView<any, any>>();

    public refresh(): void {
        // throw new Error('Method not implemented.');
    }

    public scrollTo(offset: number): void {
        if (this.listRef.current) {
            const x = this.isHorizontal ? offset : undefined;
            const y = this.isHorizontal ? undefined : offset;
            this.listRef.current.scrollToOffset(x, y);
        }
    }

    public render() {

        // Create the data provider and provide method which takes in two rows
        // of data and return if those two are different or not.
        let dataProvider = new DataProvider((r1, r2) => r1 !== r2);
        dataProvider = dataProvider.cloneWithRows(range(this.props.itemCount));

        const layoutProvider = new LayoutProvider(

            // Given an index return the item layout type
            index => 0,

            // Item dimensions callback
            (layoutType, dim, index) => {
                dim.width = this.isHorizontal ? this.props.itemSize(index) : this.props.width;
                dim.height = this.isHorizontal ? this.props.height : this.props.itemSize(index);
            }
        );

        // TODO: custom scrollbars
        return (
            <RecyclerListView
                ref={this.listRef}
                style={Object.assign({
                    width: this.props.width,
                    height: this.props.height
                }, this.props.style)}
                isHorizontal={this.isHorizontal}
                layoutProvider={layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={this.rowRenderer}
                renderAheadOffset={this.props.overscan}
            />
        );
    }

    private rowRenderer = (layoutType: any, index: number) => {
        return this.props.children(index);
    }
}