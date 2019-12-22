import styled from '@emotion/styled';
import { DomUtils } from '../internal/utils';

const tableBorder = '1px solid #ddd';

export const StyledTableView = styled.div`
    width: 100%;
    overflow-y: hidden;
`;

export const StyledTableCell = styled.div`
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;

    ${props => props.theme.defaultTheme ? `
        padding: 8px;
        vertical-align: middle;
        ` : ''};
`;

export const StyledTableHead = styled.div`
    direction: ${props => props.theme.dir};

    display: flex;
    overflow-y: hidden;

    /* add padding to compensate for scrollbar width */
    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${DomUtils.scrollbarWidth}px;
    
    ${props => props.theme.defaultTheme ? `
        border-bottom: ${tableBorder};
        ` : ''};

    & ${StyledTableCell} {
        ${props => props.theme.defaultTheme ? `
            vertical-align: bottom;
            font-weight: bold;
            ` : ''}
    }
`;

export const StyledTableBody = styled.div`
    /* no style... */
`;

export interface RowProps {
    index: number;
}

export const StyledTableRow = styled.div<RowProps>`
    display: flex;
    justify-content: stretch;
    height: 100%;
    width: 100%;

    ${props => props.theme.defaultTheme ? `
        border-top: ${props.index === 0 ? 'none' : tableBorder};
        ` : ''}
    }
`;
