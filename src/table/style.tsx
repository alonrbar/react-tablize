import { styled } from '../styled';

//
// constants
//

const scrollbarWidth = '17px';
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
    flex-flow: column;

    overflow-y: hidden;

    font-weight: bold;
    vertical-align: middle;
`;

export const TableHeadRow = styled.div`
    flex: 1;
    display: flex;
    justify-content: stretch;

    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${scrollbarWidth};
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

export const LineNumberHeadCell = styled(TableHeadCell)`
    min-width: 40px;
    max-width: 50px;
`;

//
// body
//

export const StyledTableBody = styled.div`
    display: flex;
    flex-flow: column;

    vertical-align: middle;
`;

export const TableBodyRow = styled.div`
    flex: 1;
    display: flex;
    justify-content: stretch;

    ${props => props.theme.hairlines ? `border-top: ${tableBorder}` : ''};

    &:first-of-type {
        border-top: none;
    }
`;

export const TableBodyCell = styled.div`
    flex: 1;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const LineNumberBodyCell = styled(TableBodyCell)`
    min-width: 40px;
    max-width: 50px;
`;