import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { RowAutoSize, TableBody, TableCell, TableHead, TableRow, TableView } from 'src';

const stories = storiesOf('TableView features', module);

interface Person {
    id: number;
    name: string;
    age: number;
}

function getTestItems(postfix: string): Person[] {
    const people: Person[] = [
        {
            id: 1,
            name: 'First Dude',
            age: 34
        },
        {
            id: 2,
            name: 'Second Dude',
            age: 31
        },
        {
            id: 3,
            name: 'Third Dude',
            age: 62
        },
        {
            id: 4,
            name: 'Fourth Dude',
            age: 62
        }
    ];
    return people.map(p => ({
        ...p,
        name: `${p.name} (${postfix})`
    }));
}

stories.add('variable sized rows', () => {
    const items = getTestItems('variable sized rows');
    return (
        <TableView
            rowCount={items.length}
            rowHeight={index => (index + 1) * 40}
        >
            <TableHead>
                {['Name', 'Age']}
            </TableHead>
            <TableBody>
                {index => ([
                    items[index].name,
                    items[index].age
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('custom scrollbars', () => {
    const items = getTestItems('custom scrollbars');
    return (
        <TableView
            rowCount={items.length}
            customScrollbars={true}
        >
            <TableHead>
                {['Name', 'Age']}
            </TableHead>
            <TableBody>
                {index => ([
                    items[index].name,
                    items[index].age
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('head style', () => {
    const items = getTestItems('head style');
    return (
        <TableView rowCount={items.length}>
            <TableHead
                style={{
                    color: 'red',
                    backgroundColor: 'PapayaWhip',
                    height: 70
                }}
            >
                {['Name', 'Age']}
            </TableHead>
            <TableBody>
                {index => ([
                    items[index].name,
                    items[index].age
                ])}
            </TableBody>
        </TableView>
    );
});

stories.add('style with emotion', () => {
    const items = getTestItems('style with emotion');

    const MyCustomTableRow = styled(TableRow)`
        color: green;
    `;

    const MyCustomTableCell = styled(TableCell)`
        background-color: orange;
    `;

    return (
        <TableView rowCount={items.length}>
            <TableHead>
                {['Name', 'Age']}
            </TableHead>
            <TableBody>
                {index => (
                    <MyCustomTableRow>
                        <TableCell>
                            {items[index].name}
                        </TableCell>
                        <MyCustomTableCell>
                            {items[index].age}
                        </MyCustomTableCell>
                    </MyCustomTableRow>
                )}
            </TableBody>
        </TableView>
    );
});

stories.add('no default style', () => {
    const items = getTestItems('no default style');

    return (
        <TableView
            rowCount={items.length}
            defaultStyle={false}
        >
            <TableHead>
                {['Name', 'Age']}
            </TableHead>
            <TableBody>
                {index => (
                    <TableRow>
                        <TableCell>
                            {items[index].name}
                        </TableCell>
                        <TableCell>
                            {items[index].age}
                        </TableCell>
                    </TableRow>
                )}
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
                {['Name', 'Age']}
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
                {['Name', 'Age']}
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
                {['Name', 'Age']}
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
                {['Name', 'Age']}
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