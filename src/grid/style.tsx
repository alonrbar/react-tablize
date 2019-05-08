import { styled } from '../styled';

//
// constants
//

const scrollbarWidth = '17px';
const tableBorder = '1px solid #ddd';

//
// grid
//

export const StyledGridView = styled.div`
    width: 100%;
    overflow: hidden;
`;

//
// head
//

export const StyledGridHead = styled.div`
    overflow: hidden;

    font-weight: bold;
    vertical-align: middle;

    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${scrollbarWidth};
    border-bottom: ${tableBorder};
`;

export const StyledGridHeadCell = styled.div`
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: flex-end;
    vertical-align: bottom;
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

    border-top: ${tableBorder};

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