import { Theme } from './style';
import * as React from 'react';
export interface TableContextProps {
    theme: Theme;
    isHead: boolean;
}
declare const TableContext: React.Context<TableContextProps>;
export { TableContext };
