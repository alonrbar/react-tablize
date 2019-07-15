# react-tablize

Virtual table and grid components for React.

[![npm version](https://img.shields.io/npm/v/react-tablize.svg)](https://www.npmjs.com/package/react-tablize)
[![npm license](https://img.shields.io/npm/l/react-tablize.svg)](https://www.npmjs.com/package/react-tablize)
[![dependencies](https://david-dm.org/alonrbar/react-tablize.svg)](https://github.com/alonrbar/react-tablize)
[![dependencies](https://david-dm.org/alonrbar/react-tablize/dev-status.svg)](https://github.com/alonrbar/react-tablize)

- [TableView](#tableview)
  - [Examples](#table-examples)
  - [Props](#table-props)
- [GridView](#gridview)
  - [Examples](#grid-examples)
  - [Props](#grid-props)
- [Changelog](#changelog)

## TableView

### Table Examples

#### Terse syntax

```jsx

const people: Person[];

<TableView rowCount={people.length}>
    <TableHead>
        {['Name', 'Age']}
    </TableHead>
    <TableBody>
        {index => ([
            people[index].name,
            people[index].age
        ])}
    </TableBody>
</TableView>
```

#### Rows and cells syntax

```jsx

const people: Person[];

<TableView rowCount={people.length}>
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
                    {people[index].name}
                </TableCell>
                <TableCell>
                    {people[index].age}
                </TableCell>
            </TableRow>
        )}
    </TableBody>
</TableView>
```

#### Mixed syntax

```jsx

const people: Person[];

<TableView rowCount={people.length}>
    <TableHead>
        {[
            <TableCell key="name">
                Name
            </TableCell>,
            'Age'
        ]}
    </TableHead>
    <TableBody>
        {index => (
            <TableRow>
                {[
                    <TableCell key="name">
                        {people[index].name}
                    </TableCell>,
                    people[index].age
                ]}
            </TableRow>
        )}
    </TableBody>
</TableView>
```

#### Columns syntax

```jsx

const people: Person[];

<TableView rowCount={people.length}>

    <TableColumn>
        <ColumnHead>Name</ColumnHead>
        <ColumnBody>
            {({ rowIndex }) => people[rowIndex].name}
        </ColumnBody>
    </TableColumn>

    <TableColumn>
        <ColumnHead>Age</ColumnHead>
        <ColumnBody>
            {({ rowIndex }) => people[rowIndex].age}
        </ColumnBody>
    </TableColumn>

</TableView>
```

### Table Props

| Name | Type | Default | Required | Description |
|-|-|-|-|-|
| isVirtual | boolean | true | no | Whether to use a virtual table (using [react-window](https://github.com/bvaughn/react-window)) or simple divs. Useful for performance comparison and optimization. |
| rowCount | number || yes | The number of rows in the table. |
| rowKey | `(rowIndex: number) => React.Key` | | no | React key for each row. |
| dir | `'rtl'` \| `'ltr'` | `'ltr'` | no ||
| className | string || no ||
| style | React.CSSProperties || no ||
| rowHeight | `number` \| `(rowIndex: number) => number` | 50 | no | Row height in pixels. |
| emptyMessage | string | "No Items to Display" | no | What to display when there are no items. |
| keyScroll | boolean | true | no | Enables table scrolling using the `PageUp`, `PageDown`, `Home` and `End` keys. |
| overscanCount | number | 20 | no ||
| useIsScrolling | boolean | false | no | Adds an additional isScrolling parameter to the children render function. This parameter can be used to show a placeholder row or column while the list is being scrolled. Note that using this parameter may impact performance. |

## GridView

### Grid Examples

#### Simple Grid

```jsx
<GridView
    columnCount={1000}
    columnWidth={100}
>
    <GridView.Body
        rowCount={10}
        rowHeight={40}
    >
        {({ rowIndex, columnIndex }) => (
            <GridView.Cell>
                {rowIndex}, {columnIndex}
            </GridView.Cell>
        )}
    </GridView.Body>
</GridView>
```

#### Frozen Head and Columns

```jsx
<GridView
    columnCount={1000}
    columnWidth={100}
    freezeColumns={1}
>

    <GridView.Head>
        {({ columnIndex }) => (
            <GridView.Cell>
                {columnIndex}
            </GridView.Cell>
        )}
    </GridView.Head>

    <GridView.Body
        rowCount={10}
        rowHeight={40}
    >
        {({ rowIndex, columnIndex }) => (
            <GridView.Cell>
                {rowIndex}, {columnIndex}
            </GridView.Cell>
        )}
    </GridView.Body>
</GridView>
```

#### Variable Width and Height

```jsx
<GridView
    columnCount={1000}
    columnWidth={columnIndex => columnIndex === 0 ? 50 : 100}
>

    <GridView.Head>
        {({ columnIndex }) => (
            <GridView.Cell>
                {columnIndex}
            </GridView.Cell>
        )}
    </GridView.Head>

    <GridView.Body
        rowCount={10}
        rowHeight={rowIndex => rowIndex === 0 ? 80 : 40}
    >
        {({ rowIndex, columnIndex }) => (
            <GridView.Cell>
                {rowIndex}, {columnIndex}
            </GridView.Cell>
        )}
    </GridView.Body>
</GridView>
```

### Grid Props

| Name | Type | Default | Required | Description |
|-|-|-|-|-|
| isVirtual | boolean | true | no | Whether to use a set of virtual tables (using [react-window](https://github.com/bvaughn/react-window)) or simple divs. Useful for performance comparison and optimization. |
| columnCount | number || yes ||
| columnWidth | `number` \| `(columnIndex: number) => number` || yes | Column width in pixels. |
| freezeColumns | number | 0 | no | Number of columns to freeze (always the first columns). |
| dir | `'rtl'` \| `'ltr'` | `'ltr'` | no ||
| overscanRowsCount | number | 1 | no ||
| overscanColumnsCount | number | 1 | no ||
| useIsScrolling | boolean | false | no | Adds an additional isScrolling parameter to the children render function. This parameter can be used to show a placeholder row or column while the list is being scrolled. Note that using this parameter may impact performance. |

## Changelog

The changelog can be found [here](https://github.com/alonrbar/react-tablize/blob/master/CHANGELOG.md).
