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

export const StyledTableHeadRow = styled.div`
    flex: 1;
    display: flex;
    justify-content: stretch;

    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${scrollbarWidth};
    ${props => props.theme.hairlines ? `border-bottom: ${tableBorder}` : ''};
`;

export const StyledTableHeadCell = styled.div`
    flex: 1;
    display: flex;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: flex-end;
    vertical-align: bottom;
`;

export const StyledLineNumberColumnHead = styled(StyledTableHeadCell)`
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

export const StyledTableBodyRow = styled.div`
    flex: 1;
    display: flex;
    justify-content: stretch;

    ${props => props.theme.hairlines ? `border-top: ${tableBorder}` : ''};

    &:first-of-type {
        border-top: none;
    }
`;

export const StyledTableBodyCell = styled.div`
    flex: 1;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const StyledLineNumberColumnBody = styled(StyledTableBodyCell)`
    min-width: 40px;
    max-width: 50px;
`;