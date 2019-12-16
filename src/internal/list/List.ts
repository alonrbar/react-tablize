import { DocDir, SizeCallback } from '../../types';

export interface ListRowProps {
    style?: React.CSSProperties;
}

export type ListRowRender = (index: number) => React.ReactElement<ListRowProps>;

export interface ListProps {
    style?: React.CSSProperties;
    dir: DocDir;
    layout?: 'horizontal' | 'vertical';
    height: number;
    width: number;
    itemCount: number;
    itemSize: SizeCallback;
    customScrollbar?: boolean;
    overscan?: number;
    onScroll?: (offset: number) => void;
    children: ListRowRender;
}

export interface List extends React.Component<ListProps> {

    refresh(): void;
    scrollTo(offset: number): void;
}