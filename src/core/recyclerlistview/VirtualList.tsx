import * as React from 'react';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview/web';
import { range } from '../../utils';
import { List, ListProps } from '../List';

export class VirtualList extends React.PureComponent<ListProps> implements List {    

    private get isHorizontal(): boolean {
        return this.props.layout === 'horizontal';
    }

    public refresh(): void {
        // throw new Error('Method not implemented.');
    }

    public scrollTo(offset: number): void {
        // throw new Error('Method not implemented.');
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

        return (
            <RecyclerListView
                style={{ width: this.props.width, height: this.props.height }}
                layoutProvider={layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={this.rowRenderer}
            />
        );
    }

    private rowRenderer = (layoutType: any, index: number) => {
        return this.props.children(index);
    }    
}