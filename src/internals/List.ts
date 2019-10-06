
export interface ListProps {
    style?: React.CSSProperties;
    dir: DocDir;
    layout?: 'horizontal' | 'vertical';
    height: number;
    width: number;
    itemCount: number;
    itemSize: SizeCallback;
    hideScrollbar?: boolean;
    overscan?: number;
    children: (index: number) => React.ReactNode;
}
                               
export interface List extends React.Component<ListProps> {

    scrollTo(offset: number): void;
}