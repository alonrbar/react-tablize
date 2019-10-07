import styled from '@emotion/styled';
import { SizeUtils } from '../utils';

//
// constants
//

const tableBorder = '1px solid #ddd';

//
// table
//

export const StyledTableView = styled.div`
    width: 100%;
    overflow-y: hidden;
`;

//
// head
//

export const StyledTableHead = styled.div`
    display: flex;

    overflow-y: hidden;

    font-weight: bold;
    vertical-align: middle;
`;

export const TableHeadRow = styled.div`
    flex: 1;
    display: flex;
    justify-content: stretch;

    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${SizeUtils.scrollbarWidth}px;
    ${props => props.theme.hairlines ? `border-bottom: ${tableBorder}` : ''};
`;

export const TableHeadCell = styled.div`
    flex: 1;
    display: flex;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: flex-end;
    vertical-align: bottom;
`;

//
// body
//

export const StyledTableBody = styled.div`
    /* no style... */
`;

export const TableBodyCell = styled.div`
    flex: 1;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
`;