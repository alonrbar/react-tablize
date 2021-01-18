import * as React from 'react';
import { DocDir } from '../types';
export interface Theme {
    dir: DocDir;
    defaultTheme: boolean;
}
export declare const table: () => React.CSSProperties;
export declare const tableCell: (theme: Theme) => React.CSSProperties;
export declare const tableHead: (theme: Theme) => React.CSSProperties;
export declare const tableHeadCell: (theme: Theme) => React.CSSProperties;
export declare const tableBody: () => React.CSSProperties;
export interface RowProps {
    index: number;
}
export declare const tableRow: (index: number, theme: Theme) => React.CSSProperties;
