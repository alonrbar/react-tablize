import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { RowAutoSize, TableBody, TableCell, TableHead, TableRow, TableView } from 'src';

const stories = storiesOf('TableView features', module);

stories.add('variable sized rows', () => {
    return (
        <TableView
            rowCount={1000}
            rowHeight={index => (index % 4 + 1) * 40}
        >
            <TableHead>
                {['Header 1', 'Header 2']}
            </TableHead>
            <TableBody>
                {index => ([
                    index + 1,
                    index + 1
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('custom scrollbars', () => {
    return (
        <TableView
            rowCount={1000}
            customScrollbars={true}
        >
            <TableHead>
                {['Header 1', 'Header 2']}
            </TableHead>
            <TableBody>
                {index => ([
                    index + 1,
                    index + 1
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('head style', () => {
    return (
        <TableView rowCount={1000}>
            <TableHead
                style={{
                    color: 'red',
                    backgroundColor: 'PapayaWhip',
                    height: 70
                }}
            >
                {['Header 1', 'Header 2']}
            </TableHead>
            <TableBody>
                {index => ([
                    index + 1,
                    index + 1
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('style with emotion', () => {
    const MyCustomTableRow = styled(TableRow)`
        color: green;
    `;

    const MyCustomTableCell = styled(TableCell)`
        background-color: orange;
    `;

    return (
        <TableView rowCount={1000}>
            <TableHead>
                {['Header 1', 'Header 2']}
            </TableHead>
            <TableBody>
                {index => (
                    <MyCustomTableRow>
                        <TableCell>
                            {index + 1}
                        </TableCell>
                        <MyCustomTableCell>
                            {index + 1}
                        </MyCustomTableCell>
                    </MyCustomTableRow>
                )}
            </TableBody>
        </TableView>
    );
});

stories.add('no default style', () => {
    return (
        <TableView
            rowCount={1000}
            defaultStyle={false}
        >
            <TableHead>
                {['Header 1', 'Header 2']}
            </TableHead>
            <TableBody>
                {index => ([
                    index + 1,
                    index + 1
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('scroll by keys', () => {
    return (
        <TableView
            rowCount={1000}
            isVirtual={true}
            customScrollbars={true}
        >
            <TableHead
            >
                {['Header 1', 'Header 2']}
            </TableHead>
            <TableBody>
                {index => ([
                    index + 1,
                    index + 1
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('non virtual', () => {
    return (
        <TableView
            rowCount={1000}
            isVirtual={false}
        >
            <TableHead
            >
                {['Header 1', 'Header 2']}
            </TableHead>
            <TableBody>
                {index => ([
                    index + 1,
                    index + 1
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('non virtual - auto-sized rows', () => {
    return (
        <TableView
            rowCount={1000}
            isVirtual={false}
            rowHeight={RowAutoSize}
        >
            <TableHead
            >
                {['Header 1', 'Header 2']}
            </TableHead>
            <TableBody>
                {index => ([
                    index + 1,
                    index + 1
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('non virtual - custom scrollbars', () => {
    return (
        <TableView
            rowCount={1000}
            isVirtual={false}
            customScrollbars={true}
        >
            <TableHead
            >
                {['Header 1', 'Header 2']}
            </TableHead>
            <TableBody>
                {index => ([
                    index + 1,
                    index + 1
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('rtl', () => {
    return (
        <TableView
            rowCount={1000}
            dir="rtl"
        >
            <TableHead>
                {['שם', 'גיל']}
            </TableHead>
            <TableBody>
                {index => ([
                    'שם ' + (index + 1),
                    'גיל ' + (index + 1)
                ])}
            </TableBody>
        </TableView>
    );
});