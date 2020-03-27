import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { TableBody, TableCell, TableHead, TableRow, Table } from 'src';

const stories = storiesOf('Table features', module);

stories.add('variable sized rows', () => {
    return (
        <Table
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
        </Table>
    );
});

stories.add('custom scrollbars', () => {
    return (
        <Table
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
        </Table>
    );
});

stories.add('head style', () => {
    return (
        <Table rowCount={1000}>
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
        </Table>
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
        <Table rowCount={1000}>
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
        </Table>
    );
});

stories.add('no default style', () => {
    return (
        <Table
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
        </Table>
    );
});

stories.add('scroll by keys', () => {
    return (
        <Table
            rowCount={1000}
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
        </Table>
    );
});

stories.add('rtl', () => {
    return (
        <Table
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
        </Table>
    );
});