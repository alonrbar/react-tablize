import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { GridView } from 'src/grid';

const stories = storiesOf('GridView - Basic', module);

stories.add('empty grid', () => (
    <GridView
        columnCount={0}
        rowCount={0}
        estimatedColumnWidth={0}
        estimatedRowHeight={0}
    >
        {() => null}
    </GridView>
));

stories.add('simple grid', () => (
    <GridView
        columnCount={1000}
        rowCount={10}
        estimatedColumnWidth={100}
        estimatedRowHeight={40}
    >
        {cellProps => {
            if (cellProps.tilePosition.vertical === 'header') {
                return (
                    <div style={{ color: 'red' }}>
                        {cellProps.absColIndex}
                    </div>
                );
            }

            return `${cellProps.absRowIndex}, ${cellProps.absColIndex}`;
        }}
    </GridView>
));
