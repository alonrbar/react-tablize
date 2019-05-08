import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { GridView } from 'src/grid';
import styled from '@emotion/styled';

const stories = storiesOf('GridView syntax', module);

stories.add('empty grid', () => (
    <GridView
        columnCount={0}
        columnWidth={0}
    />
));

const Some = styled(GridView.Cell)`
    color: red;
    background-color: blue;
`;

const SomeOther = styled(Some)`
    font-style: italic;
`;

stories.add('test emotion', () => (
    <SomeOther>Hello</SomeOther>
));

stories.add('full syntax', () => (
    <GridView
        columnCount={10}
        columnWidth={100}
    >
        <GridView.Head>
            {(colIndex) => (
                <Some>
                    {colIndex}
                </Some>
            )}
        </GridView.Head>
        <GridView.Body
            firstColumn={null}
        >
            {(rowIndex, colIndex) => (
                <GridView.Cell>
                    {rowIndex}, {colIndex}
                </GridView.Cell>
            )}
        </GridView.Body>
    </GridView>
));
