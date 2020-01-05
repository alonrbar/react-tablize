import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { GridView, RenderCellProps } from 'src';

const stories = storiesOf('GridView - use cases', module);

class EditableGridViewState {
    public columnCount = 3;
}

class EditableGridView extends React.PureComponent<{}, EditableGridViewState> {

    constructor(props: any) {
        super(props);
        this.state = new EditableGridViewState();
    }

    public render() {
        return (
            <div>
                <GridView
                    style={{
                        direction: 'rtl',
                        height: 500,
                        width: 600
                    }}
                    columnCount={this.state.columnCount}
                    rowCount={20}
                    columnWidth={(index: number): number => {

                        // last column
                        if (index === this.state.columnCount - 1)
                            return 80;

                        // other columns
                        return 120;
                    }}
                    rowHeight={70}
                    fixedHeaderHeight={60}
                    fixedLeftWidth={120}
                >
                    {renderCell}
                </GridView>
                <div style={{ margin: 20 }}>
                    <button
                        onClick={() => this.setState(prevState => ({ columnCount: prevState.columnCount + 1 }))}
                    >
                        Add Column
                    </button>
                    &nbsp;
                    <button
                        onClick={() => this.setState(prevState => ({ columnCount: prevState.columnCount - 1 }))}
                    >
                        Remove Column
                    </button>
                </div>
            </div>
        );
    }
}

stories.add('rtl - dynamic width - add/remove columns', () => {
    return (
        <EditableGridView />
    );
});

function renderCell(cellProps: RenderCellProps): React.ReactNode {

    const cellStyle: React.CSSProperties = {
        direction: 'ltr',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    };

    if (cellProps.tilePosition.horizontal !== 'center') {
        return (
            <div style={{ background: 'lightyellow', ...cellStyle }}>
                {cellProps.absColIndex}, {cellProps.absRowIndex}
            </div>
        );
    }

    if (cellProps.tilePosition.vertical !== 'body') {
        return (
            <div style={{ background: 'beige', ...cellStyle }}>
                {cellProps.absColIndex}, {cellProps.absRowIndex}
            </div>
        );
    }

    return (
        <div style={{ background: 'antiquewhite', ...cellStyle }}>
            {cellProps.absColIndex}, {cellProps.absRowIndex}
        </div>
    );
}