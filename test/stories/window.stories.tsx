import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { VirtualWindow } from 'src/internal/window';

const stories = storiesOf('VirtualWindow', module);

stories.add('empty window', () => (
    <VirtualWindow
        height={500}
        width={500}
        columnCount={0}
        rowCount={0}
        columnWidth={1}
        rowHeight={1}
    >
        {() => null}
    </VirtualWindow>
));

stories.add('simple window - grid', () => (
    <VirtualWindow
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
    </VirtualWindow>
));

stories.add('simple window - grid - rtl', () => (
    <VirtualWindow
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
    </VirtualWindow>
));

stories.add('simple window - list', () => (
    <VirtualWindow
        height={500}
        width={500}
        columnCount={1}
        rowCount={50}
        columnWidth={400}
        rowHeight={40}
    >
        {cellProps => `${cellProps.colIndex}, ${cellProps.rowIndex}`}
    </VirtualWindow>
));

stories.add('simple window - list - rtl', () => (
    <VirtualWindow
        direction='rtl'
        scrollDirection='vertical'
        height={500}
        width={500}
        columnCount={1}
        rowCount={50}
        columnWidth={400}
        rowHeight={40}
    >
        {cellProps => `${cellProps.colIndex}, ${cellProps.rowIndex}`}
    </VirtualWindow>
));
