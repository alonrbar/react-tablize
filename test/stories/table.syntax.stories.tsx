import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ColumnBody, ColumnHead, TableBody, TableCell, TableColumn, TableHead, TableRow, Table } from 'src';

const stories = storiesOf('Table syntax', module);

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

stories.add('empty table', () => (
    <Table rowCount={0} />
));

stories.add('terse syntax', () => {
    const items = getTestItems('terse');
    return (
        <Table rowCount={items.length}>
            <TableHead>
                {['Name', 'Age']}
            </TableHead>
            <TableBody>
                {index => ([
                    items[index].name,
                    items[index].age
                ])}
            </TableBody>
        </Table>
    );
});

stories.add('no head', () => {
    const items = getTestItems('no head');
    return (
        <Table rowCount={items.length}>
            <TableBody>
                {index => ([
                    items[index].name,
                    items[index].age
                ])}
            </TableBody>
        </Table>
    );
});

stories.add('rows and cells syntax', () => {
    const items = getTestItems('rows and cells');
    return (
        <Table rowCount={items.length}>
            <TableHead>
                <TableCell>
                    Name
                </TableCell>
                <TableCell>
                    Age
                </TableCell>
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
        </Table>
    );
});

stories.add('mixed syntax', () => {
    const items = getTestItems('mixed syntax');
    return (
        <Table rowCount={items.length}>
            <TableHead>
                {['Name', 'Age']}
            </TableHead>
            <TableBody>
                {index => (
                    <TableRow>
                        {[
                            items[index].name,
                            items[index].age
                        ]}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
});

stories.add('columns syntax', () => {
    const items = getTestItems('columns');
    return (
        <Table rowCount={items.length}>

            <TableColumn>
                <ColumnHead>Name</ColumnHead>
                <ColumnBody>
                    {({ rowIndex }) => items[rowIndex].name}
                </ColumnBody>
            </TableColumn>

            <TableColumn>
                <ColumnHead>Age</ColumnHead>
                <ColumnBody>
                    {({ rowIndex }) => items[rowIndex].age}
                </ColumnBody>
            </TableColumn>

        </Table>
    );
});