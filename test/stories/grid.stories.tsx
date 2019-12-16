import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { GridView, RenderCellProps } from 'src';

const stories = storiesOf('GridView', module);

stories.add('empty grid', () => (
    <GridView
        columnCount={0}
        rowCount={0}
        columnWidth={1}
        rowHeight={1}
    >
        {() => null}
    </GridView>
));

stories.add('simple grid', () => (
    <GridView
        style={{
            direction: 'rtl',
            width: 500
        }}
        columnCount={1000}
        rowCount={1000}
        columnWidth={80}
        rowHeight={40}
        fixedHeaderHeight={40}
        fixedRightWidth={80}
        fixedLeftWidth={80}
    >
        {renderCell}
    </GridView>
));

stories.add('simple grid - list', () => (
    <GridView
        columnCount={1}
        rowCount={50}
        columnWidth={400}
        rowHeight={40}
    >
        {renderCell}
    </GridView>
));

stories.add('dynamic width', () => {
    const colCount = 3;
    
    return (
        <GridView
            style={{
                direction: 'rtl',
                width: 300
            }}
            columnCount={colCount}
            rowCount={20}
            columnWidth={(index: number): number => {

                // average column
                if (index === colCount - 1)
                    return 80;

                // assignment
                return 120;
            }}
            rowHeight={70}
            estimatedColumnWidth={80}
            fixedHeaderHeight={60}
            fixedFooterHeight={70}
            fixedLeftWidth={120}
        >
            {renderCell}
        </GridView>
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