import * as React from 'react';
import { DomUtils } from '../internal/utils';
import { DocDir } from '../types';

const tableBorder = '1px solid #ddd';

export interface Theme {
    dir: DocDir;
    defaultTheme: boolean;
}

export const table = (): React.CSSProperties => ({
    width: '100%',
    overflowY: 'hidden'
});

export const tableCell = (theme: Theme): React.CSSProperties => {
    const style: React.CSSProperties = {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        boxSizing: 'border-box'
    };
    if (theme.defaultTheme) {
        style.padding = 8;
        style.verticalAlign = 'middle';
    }
    return style;
};

export const tableHead = (theme: Theme): React.CSSProperties => {
    const style: React.CSSProperties = {
        direction: theme.dir,
        display: 'flex',
        overflowY: 'hidden'
    };

    /* add padding to compensate for scrollbar width */
    if (theme.dir === 'rtl') {
        style.paddingLeft = DomUtils.scrollbarWidth;
    } else {
        style.paddingRight = DomUtils.scrollbarWidth;
    }

    if (theme.defaultTheme) {
        style.borderBottom = tableBorder;
    }
   
    return style;
};

export const tableHeadCell = (theme: Theme): React.CSSProperties => {
    const style = tableCell(theme);
    if (theme.defaultTheme) {
        style.verticalAlign = 'bottom';
        style.fontWeight = 'bold';
    }
    return style;
};

export const tableBody = (): React.CSSProperties => ({
    /* no style... */
});

export interface RowProps {
    index: number;
}

export const tableRow = (index: number, theme: Theme): React.CSSProperties => {
    const style: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'stretch',
        height: '100%',
        width: '100%'
    };
    if (theme.defaultTheme) {
        style.borderTop = (index === 0 ? 'none' : tableBorder);
    }
    return style;
};
