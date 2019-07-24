import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { GridView } from 'src/grid';

const stories = storiesOf('GridView syntax', module);

stories.add('empty grid', () => (
    <GridView
        columnCount={0}
        columnWidth={0}        
    />
));

stories.add('simple grid', () => (
    <GridView
        columnCount={1000}
        columnWidth={100}
    >

        <GridView.Head>
            {({ columnIndex }) => (
                <GridView.Cell style={{ color: 'red' }}>
                    {columnIndex}
                </GridView.Cell>
            )}
        </GridView.Head>

        <GridView.Body
            rowCount={10}
            rowHeight={40}
        >
            {({ rowIndex, columnIndex }) => (
                <GridView.Cell style={{ color: 'blue' }}>
                    {rowIndex}, {columnIndex}
                </GridView.Cell>
            )}
        </GridView.Body>
    </GridView>
));

stories.add('simple grid - no head', () => (
    <GridView
        columnCount={1000}
        columnWidth={100}
    >
        <GridView.Body
            rowCount={10}
            rowHeight={40}
        >
            {({ rowIndex, columnIndex }) => (
                <GridView.Cell style={{ color: 'blue' }}>
                    {rowIndex}, {columnIndex}
                </GridView.Cell>
            )}
        </GridView.Body>
    </GridView>
));