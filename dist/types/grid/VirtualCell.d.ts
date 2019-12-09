import * as React from 'react';
import { DocDir } from '../types';
export interface VirtualCellProps {
    className: string;
    direction: DocDir;
    height: number;
    width: number;
    left: number;
    top: number;
    children: React.ReactNode;
}
export declare class VirtualCell extends React.PureComponent<VirtualCellProps> {
    render(): JSX.Element;
}
