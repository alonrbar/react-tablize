import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { TableView, TableHead, TableBody } from '../../src';

storiesOf('TableView', module)
    .add('basic state', () => {
        const people = [
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
        return (
            <TableView
                items={people}
            >
                <TableHead>
                    {['Name', 'Age']}
                </TableHead>
                <TableBody>
                    {(person: any) => ([
                        person.name,
                        person.age
                    ])}
                </TableBody>
            </TableView>
        );
    })
    .add('empty table', () => (
        <TableView
            items={[]}
        />
    ));   