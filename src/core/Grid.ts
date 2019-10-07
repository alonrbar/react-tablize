
export interface GridCellRenderArgs {
    rowIndex: number; 
    columnIndex: number;
}

export interface GridCellProps {
    style?: React.CSSProperties;
}

export type GridCellRender = (args: GridCellRenderArgs) => React.ReactElement<GridCellProps>;

export interface GridProps {
    style?: React.CSSProperties;
    dir: DocDir;
    height: number;
    width: number;
    rowCount: number;
    rowHeight: SizeCallback;
    columnCount: number;
    columnWidth: SizeCallback;
    hideVerticalScrollbar?: boolean;
    overscanRows?: number;
    overscanColumns?: number;
    onScroll?: (e: ScrollEvent) => void;
    children: GridCellRender;
}

export interface Grid extends React.Component<GridProps> {

    scrollTo(e: ScrollEvent): void;
}