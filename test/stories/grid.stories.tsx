import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Grid, RenderCellProps } from 'src';

const stories = storiesOf('Grid', module);

stories.add('empty grid', () => (
    <Grid
        columnCount={0}
        rowCount={0}
        columnWidth={1}
        rowHeight={1}
    >
        {() => null}
    </Grid>
));

stories.add('simple grid', () => (
    <Grid
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
    </Grid>
));

stories.add('simple grid - list', () => (
    <Grid
        columnCount={1}
        rowCount={50}
        columnWidth={400}
        rowHeight={40}
    >
        {renderCell}
    </Grid>
));

stories.add('dynamic width', () => {
    const colCount = 3;
    
    return (
        <Grid
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
            // estimatedColumnWidth={80}
            fixedHeaderHeight={60}
            fixedFooterHeight={70}
            fixedLeftWidth={120}
        >
            {renderCell}
        </Grid>
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