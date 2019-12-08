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

## GridView

### Grid Examples

#### Simple Grid

```jsx
<GridView
    columnCount={1000}
    rowCount={10}
    estimatedColumnWidth={100}
    estimatedRowHeight={40}
>
    {cellProps => (
        `${cellProps.absRowIndex}, ${cellProps.absColIndex}`
    )}
</GridView>
```

#### Fixed Head and Columns

```jsx
<GridView
    columnCount={1000}
    rowCount={10}
    estimatedColumnWidth={100}
    estimatedRowHeight={40}
    fixedHeaderHeight={50}
    fixedLeftWidth={100}
>
    {cellProps => {

        // fixed left column
        if (cellProps.tilePosition.horizontal === 'left') {
            return (
                <div style={{ color: 'green' }}>
                    {cellProps.absColIndex}
                </div>
            );
        }

        // fixed header
        if (cellProps.tilePosition.vertical === 'header') {
            return (
                <div style={{ color: 'red' }}>
                    {cellProps.absColIndex}
                </div>
            );
        }

        // body
        return `${cellProps.absRowIndex}, ${cellProps.absColIndex}`;
    }}
</GridView>
```

#### Variable Width and Height

```jsx
<GridView
    columnCount={1000}
    rowCount={10}
    estimatedColumnWidth={75}
    columnWidth={columnIndex => columnIndex === 0 ? 50 : 100}
    estimatedRowHeight={60}
    rowHeight={rowIndex => rowIndex === 0 ? 80 : 40}
>
    {cellProps => (
        `${cellProps.absRowIndex}, ${cellProps.absColIndex}`
    )}
</GridView>
```

### Grid Cell Render Props

```typescript
interface RenderCellProps {
    absColIndex: number;
    absRowIndex: number;
    /**
     * Column index relative to the current tile.
     */
    relColIndex: number;
    /**
     * Row index relative to the current tile.
     */
    relRowIndex: number;
    tileKey: TileKey;
    tilePosition: TilePosition;
    height: number;
    width: number;
}

enum TileKey {
    HeaderLeft,
    HeaderCenter,
    HeaderRight,
    BodyLeft,
    BodyCenter,
    BodyRight,
    FooterLeft,
    FooterCenter,
    FooterRight
}

interface TilePosition {
    vertical: 'header' | 'body' | 'footer';
    horizontal: 'left' | 'center' | 'right';
}
```

## Prior art and motivation

Some parts of this library are inspired by, some are a modification of, and
some are a complete ripoff of these libraries:

- https://github.com/bvaughn/react-window
- https://github.com/ranneyd/sticky-table
- https://github.com/fulcrumapp/react-virtual-grid
- https://github.com/Flipkart/recyclerlistview

Thank you!

## Changelog

The changelog can be found [here](https://github.com/alonrbar/react-tablize/blob/master/CHANGELOG.md).
