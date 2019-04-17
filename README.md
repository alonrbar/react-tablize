# react-tablize

React virtual table component.

[![npm version](https://img.shields.io/npm/v/react-tablize.svg)](https://www.npmjs.com/package/react-tablize)
[![npm license](https://img.shields.io/npm/l/react-tablize.svg)](https://www.npmjs.com/package/react-tablize)
[![dependencies](https://david-dm.org/alonrbar/react-tablize.svg)](https://github.com/alonrbar/react-tablize)
[![dependencies](https://david-dm.org/alonrbar/react-tablize/dev-status.svg)](https://github.com/alonrbar/react-tablize)

## Examples

### Terse syntax

```jsx
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
```

### Rows and cells syntax

```jsx
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
```

### Mixed syntax

```jsx
    <TableView items={people}>
        <TableHead>
            {[
                <TableCell key="name">
                    Name
                </TableCell>,
                'Age'
            ]}
        </TableHead>
        <TableBody>
            {(person: Person) => (
                <TableRow>
                    {[
                        <TableCell key="name">
                            {person.name}
                        </TableCell>,
                        person.age
                    ]}
                </TableRow>
            )}
        </TableBody>
    </TableView>
```

### Columns syntax

```jsx
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
```