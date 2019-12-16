import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { GridView } from 'src/grid';

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
        {cellProps => (
            <div style={{ direction: 'ltr', textAlign: 'center' }}>
                {`${cellProps.absColIndex}, ${cellProps.absRowIndex}`}
            </div>
        )}
    </GridView>
));

stories.add('simple grid - list', () => (
    <GridView
        columnCount={1}
        rowCount={50}
        columnWidth={400}
        rowHeight={40}
    >
        {cellProps => `${cellProps.absColIndex}, ${cellProps.absRowIndex}`}
    </GridView>
));

stories.add('dynamic width', () => {
    const colCount = 3;
    const cellStyle: React.CSSProperties = {
        height: '100%',
        width: '100%',
        display: 'flex',
        boxSizing: 'border-box',
        alignItems: 'center',
        padding: 5
    };
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
            {cellProps => {

                if (cellProps.tilePosition.vertical === 'header') {
                    return (
                        <div style={{ background: 'beige', ...cellStyle }}>
                            {cellProps.absColIndex}, {cellProps.absRowIndex}
                        </div>
                    );
                }

                if (cellProps.tilePosition.vertical === 'footer') {
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
            }}
        </GridView>
    );
});
