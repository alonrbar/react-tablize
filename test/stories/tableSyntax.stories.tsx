import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ColumnBody, ColumnHead, TableBody, TableCell, TableColumn, TableHead, TableRow, TableView } from '../../src';

const stories = storiesOf('TableView syntax', module);

interface Person {
    id: number;
    name: string;
    age: number;
}

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

stories.add('empty table', () => (
    <TableView items={[]} />
));

stories.add('terse syntax', () => (
    <TableView items={people}>
        <TableHead>
            {['Name', 'Age']}
        </TableHead>
        <TableBody>
            {(person: Person) => ([
                person.name,
                person.age
            ])}
        </TableBody>
    </TableView>
));

stories.add('rows and cells syntax', () => (
    <TableView items={people}>
        <TableHead>
            <TableCell>
                Name
            </TableCell>
            <TableCell>
                Age
            </TableCell>
        </TableHead>
        <TableBody>
            {(person: Person) => (
                <TableRow>
                    <TableCell>
                        {person.name}
                    </TableCell>
                    <TableCell>
                        {person.age}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    </TableView>
));

stories.add('rows with terse cells syntax', () => (
    <TableView items={people}>
        <TableHead>
            {['Name', 'Age']}
        </TableHead>
        <TableBody>
            {(person: Person) => (
                <TableRow>
                    {[
                        person.name,
                        person.age
                    ]}
                </TableRow>
            )}
        </TableBody>
    </TableView>
));

stories.add('columns syntax', () => (
    <TableView items={people}>

        <TableColumn>
            <ColumnHead>Name</ColumnHead>
            <ColumnBody>
                {(person: Person) => person.name}
            </ColumnBody>
        </TableColumn>

        <TableColumn>
            <ColumnHead>Age</ColumnHead>
            <ColumnBody>
                {(person: Person) => person.age}
            </ColumnBody>
        </TableColumn>

    </TableView>
));

