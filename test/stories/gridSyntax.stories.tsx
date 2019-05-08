import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { GridView } from 'src/grid';

const stories = storiesOf('GridView syntax', module);

stories.add('empty grid', () => (
    <GridView
        columnCount={0}
        columnWidth={0}
        rowCount={0}
        rowHeight={0}
    />
));

stories.add('full syntax', () => (
    <GridView
        columnCount={1000}
        columnWidth={100}
        rowCount={10}
        rowHeight={40}
        freezeColumns={1}
    >

        <GridView.Head>
            {(colIndex) => (
                <GridView.Cell>
                    {colIndex}
                </GridView.Cell>
            )}
        </GridView.Head>

        <GridView.Body>
            {(rowIndex, colIndex) => (
                <GridView.Cell>
                    {rowIndex}, {colIndex}
                </GridView.Cell>
            )}
        </GridView.Body>
    </GridView>
));
