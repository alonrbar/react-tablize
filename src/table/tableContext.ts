import { Theme } from './style';
import * as React from 'react';

export interface TableContextProps {
    theme: Theme;
    isHead: boolean;
}

const TableContext = React.createContext<TableContextProps>(undefined);
TableContext.displayName = 'TableContext';
export { TableContext };
