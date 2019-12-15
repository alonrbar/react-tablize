import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { VirtualTile } from 'src/grid';

const stories = storiesOf('VirtualTile', module);

stories.add('empty tile', () => (
    <VirtualTile
        height={500}
        width={500}
        columnCount={0}
        rowCount={0}
        columnWidth={1}
        rowHeight={1}
    >
        {() => null}
    </VirtualTile>
));

stories.add('simple tile - grid', () => (
    <VirtualTile
        height={500}
        width={500}
        columnCount={1000}
        rowCount={1000}
        columnWidth={80}
        rowHeight={40}
    >
        {cellProps => (
            <div style={{ textAlign: 'center' }}>
                {`${cellProps.rowIndex}, ${cellProps.colIndex}`}
            </div>
        )}
    </VirtualTile>
));

stories.add('simple tile - grid - rtl', () => (
    <VirtualTile
        direction='rtl'
        height={500}
        width={500}
        columnCount={1000}
        rowCount={1000}
        columnWidth={80}
        rowHeight={40}
    >
        {cellProps => (
            <div style={{ direction: 'ltr', textAlign: 'center' }}>
                {`${cellProps.colIndex}, ${cellProps.rowIndex}`}
            </div>
        )}
    </VirtualTile>
));

stories.add('simple tile - list', () => (
    <VirtualTile
        height={500}
        width={500}
        columnCount={1}
        rowCount={50}
        columnWidth={400}
        rowHeight={40}
    >
        {cellProps => `${cellProps.colIndex}, ${cellProps.rowIndex}`}
    </VirtualTile>
));
