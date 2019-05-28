import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ColumnBody, ColumnHead, TableBody, TableCell, TableColumn, TableHead, TableRow, TableView } from 'src/table';

const stories = storiesOf('TableView syntax', module);

interface Person {
    id: number;
    name: string;
    age: number;
}

function getTestItems(postfix: string): Person[] {
    const people: Person[] = [
        {
            id: 1,
            name: 'Alon',
            age: 34
        },
        {
            id: 2,
            name: 'Gilad',
            age: 31
        }
    ];
    return people.map(p => ({
        ...p,
        name: `${p.name} (${postfix})`
    }));
}

stories.add('empty table', () => (
    <TableView rowCount={0} />
));

stories.add('terse syntax', () => {
    const items = getTestItems('terse');
    return (
        <TableView rowCount={items.length}>
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

stories.add('rows and cells syntax', () => {
    const items = getTestItems('rows and cells');
    return (
        <TableView rowCount={items.length}>
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
        </TableView>
    );
});

stories.add('mixed syntax', () => {
    const items = getTestItems('rows and cells - terse');
    return (
        <TableView rowCount={items.length}>
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
        </TableView>
    );
});

stories.add('columns syntax', () => {
    const items = getTestItems('columns');
    return (
        <TableView rowCount={items.length}>

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

        </TableView>
    );
});

