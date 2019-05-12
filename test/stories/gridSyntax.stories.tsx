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
            {(colIndex) => (
                <GridView.Cell style={{ color: 'red' }}>
                    {colIndex}
                </GridView.Cell>
            )}
        </GridView.Head>

        <GridView.Body
            rowCount={10}
            rowHeight={40}
        >
            {(rowIndex, colIndex) => (
                <GridView.Cell style={{ color: 'blue' }}>
                    {rowIndex}, {colIndex}
                </GridView.Cell>
            )}
        </GridView.Body>
    </GridView>
));

stories.add('simple grid - 1 frozen column', () => (
    <GridView
        columnCount={1000}
        columnWidth={100}
        freezeColumns={1}
    >

        <GridView.Head>
            {(colIndex) => (
                <GridView.Cell style={{ color: 'red' }}>
                    {colIndex}
                </GridView.Cell>
            )}
        </GridView.Head>

        <GridView.Body
            rowCount={10}
            rowHeight={40}
        >
            {(rowIndex, colIndex) => (
                <GridView.Cell style={{ color: 'blue' }}>
                    {rowIndex}, {colIndex}
                </GridView.Cell>
            )}
        </GridView.Body>
    </GridView>
));

stories.add('variable size grid', () => (
    <GridView
        columnCount={1000}
        columnWidth={colIndex => colIndex ? 100 : 50}
        freezeColumns={1}
    >

        <GridView.Head>
            {(colIndex) => (
                <GridView.Cell style={{ color: 'red' }}>
                    {colIndex}
                </GridView.Cell>
            )}
        </GridView.Head>

        <GridView.Body
            rowCount={10}
            rowHeight={rowIndex => rowIndex ? 40 : 80}
        >
            {(rowIndex, colIndex) => (
                <GridView.Cell style={{ color: 'blue' }}>
                    {rowIndex}, {colIndex}
                </GridView.Cell>
            )}
        </GridView.Body>
    </GridView>
));
