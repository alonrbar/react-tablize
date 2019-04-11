import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { TableView, TableHead, TableBody } from '../../src';

storiesOf('TableView', module)
    .add('basic state', () => {
        const items = [
            {
                id: 1,
                name: 'Alon'
            },
            {
                id: 2,
                name: 'Gilad'
            }
        ];
        return (
            <TableView
                items={items}
            >
                <TableHead>
                    {[ 'Name' ]}
                </TableHead>
                <TableBody>
                    {item => item.name}
                </TableBody>
            </TableView>
        );
    })
    .add('empty table', () => (
        <TableView
            items={[]}
        />
    ));   