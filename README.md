# react-tablize

High performance virtual table and grid components for React.

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
- [Prior art and motivation](#prior-art-and-motivation)
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
| rowCount | number || yes | The number of rows in the table. |
| rowHeight | `number` \| `(rowIndex: number) => number` | 50 | no | Row height in pixels. |
| rowKey | `(rowIndex: number) => React.Key` | | no | React key for each row. |
| overscanCount | number | 20 | no | Number of rows to render ahead. |
| dir | `'rtl'` \| `'ltr'` | `'ltr'` | no ||
| className | string || no ||
| style | React.CSSProperties || no ||
| placeholder | React.ReactNode | | no | What to display when there are no items. |

## GridView

### Grid Examples

#### Simple Grid

```jsx
<GridView
    columnCount={1000}
    rowCount={10}
    columnWidth={100}
    rowHeight={40}
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
    columnWidth={100}
    rowHeight={40}
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
    columnWidth={columnIndex => columnIndex === 0 ? 50 : 100}
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
    /**
     * Absolute column index, taking into account fixed columns.
     */
    absColIndex: number;
    /**
     * Absolute row index, taking into account fixed header and/or footer.
     */
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
    /**
     * The height of the rendered cell.  
     * You don't have to do anything with it, it's just an informative prop.
     */
    height: number;
    /**
     * The width of the rendered cell.  
     * You don't have to do anything with it, it's just an informative prop.
     */
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

If there are so many virtual scrolling libraries out there, why do I need another one?  
Well, each of these libraries implements only part of what I personally needed
so I've created a library that combines the best of all:

| Library | Grid component | Fixed rows and columns | RTL | Recycling |
|-|-|-|-|-|
| react-window | ✔ | ✖ | ✔ | ✖ |
| sticky-table | ✔ | ✔ | ✖ | ✖ |
| react-virtual-grid | ✔ | ✔ | ? | ✖ |
| recyclerlistview | ✖ | ? | ? | ✔ |
| **react-tablize** | ✔ | ✔ | ✔ | ✔ |

## Changelog

The changelog can be found [here](https://github.com/alonrbar/react-tablize/blob/master/CHANGELOG.md).
