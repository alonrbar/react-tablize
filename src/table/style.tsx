import styled from '@emotion/styled';
import { SizeUtils } from '../utils';

export const StyledTableView = styled.div`
    width: 100%;
    overflow-y: hidden;
`;

export const StyledTableHead = styled.div`
    display: flex;
    overflow-y: hidden;
`;

export const TableHeadRow = styled.div`
    flex: 1;
    display: flex;

    /* add padding to compensate for scrollbar width */
    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${SizeUtils.scrollbarWidth}px;
`;

export const StyledTableBody = styled.div`
    /* no style... */
`;

export const TableBodyRow = styled.div`
    display: flex;
`;

export const StyledTableCell = styled.div`
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
`;
