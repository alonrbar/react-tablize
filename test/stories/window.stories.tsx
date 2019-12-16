import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { RenderWindowCellProps, VirtualWindow } from 'src/internal/window';

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
        {renderCell}
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
        {renderCell}
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
        {renderCell}
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
        {renderCell}
    </VirtualWindow>
));

function renderCell(cellProps: RenderWindowCellProps): React.ReactNode {
    
    const cellStyle: React.CSSProperties = {
        background: 'beige',
        direction: 'ltr',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    };

    return (
        <div style={cellStyle}>
            {cellProps.colIndex}, {cellProps.rowIndex}
        </div>
    );
}