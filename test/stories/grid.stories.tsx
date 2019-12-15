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
        style={{
            direction: 'rtl',
            width: 500
        }}
        columnCount={1000}
        rowCount={1000}
        estimatedColumnWidth={80}
        estimatedRowHeight={40}
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
        estimatedColumnWidth={400}
        estimatedRowHeight={40}
    >
        {cellProps => `${cellProps.absColIndex}, ${cellProps.absRowIndex}`}
    </GridView>
));
