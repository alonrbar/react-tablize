import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview/web';

const styles = {
    container: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        border: '0.5px solid black',
    },
    containerGridLeft: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        border: '0.5px solid black',
    },
    containerGridRight: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        border: '0.5px solid black',
    },
};

let containerCount = 0;

class CellContainer extends React.Component<any> {

    private _containerId: number;

    constructor(args: any) {
        super(args);
        this._containerId = containerCount++;
    }
    public render() {
        return (
            <div {...this.props}>
                {this.props.children}
                <div>Cell Id: {this._containerId}</div>
            </div>
        );
    }
}

class RecycleTestComponent extends React.Component<any, any> {

    private layoutProvider: LayoutProvider;

    constructor(args: any) {
        super(args);

        let width = window.innerWidth;

        // Create the data provider and provide method which takes in two rows
        // of data and return if those two are different or not.
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        this.layoutProvider = new LayoutProvider(

            // Given an index return the item layout type
            index => 0,

            // Given a type and object set the height and width for that
            // type on given object  
            (type, dim) => {
                dim.width = width;
                dim.height = 140;
            }
        );

        this.rowRenderer = this.rowRenderer.bind(this);

        //Since component should always render once data has changed, make data provider part of the state
        this.state = {
            dataProvider: dataProvider.cloneWithRows(this.generateArray(300)),
        };
    }

    public render() {
        return (
            <RecyclerListView
                useWindowScroll={true}
                layoutProvider={this.layoutProvider}
                dataProvider={this.state.dataProvider}
                rowRenderer={this.rowRenderer}
            />
        );
    }

    private rowRenderer(type: any, data: any) {
        return (
            <CellContainer style={styles.container}>
                <div>Data: {data}</div>
            </CellContainer>
        );
    }

    private generateArray(n: number) {
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = i;
        }
        return arr;
    }
}

const stories = storiesOf('Recycle list', module);

stories.add('simple grid - 1 frozen column', () => (
    <RecycleTestComponent />
));
