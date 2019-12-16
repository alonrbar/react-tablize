import styled from '@emotion/styled';
import { DomUtils } from '../internal/utils';

export const StyledTableView = styled.div`
    width: 100%;
    overflow-y: hidden;
`;

export const StyledTableHead = styled.div`
    display: flex;
    overflow-y: hidden;
    
    /* add padding to compensate for scrollbar width */
    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${DomUtils.scrollbarWidth}px;
`;

export const StyledTableBody = styled.div`
    /* no style... */
`;

export const StyledTableRow = styled.div`
    display: flex;
`;

export const StyledTableCell = styled.div`
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
`;
