import { styled } from '../styled';

//
// constants
//

export const scrollbarWidth = 17;
const tableBorder = '1px solid #ddd';

//
// grid
//

export const StyledGridView = styled.div`
    label: grid-view;

    width: 100%;
`;

//
// head
//

export const StyledGridHead = styled.div`
    label: grid-head;

    display: flex;

    font-weight: bold;
    vertical-align: middle;

    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${scrollbarWidth}px;
    border-bottom: ${tableBorder};
`;

export const StyledGridHeadCell = styled.div`
    label: grid-head-cell;

    display: flex;

    overflow: hidden;
    text-overflow: ellipsis;

    align-items: flex-end;
    vertical-align: bottom;
`;

//
// body
//

export const StyledGridBody = styled.div`
    label: grid-body;
`;

export const StyledGridBodyCell = styled.div`
    label: grid-body-cell;

    display: flex;

    height: 100%;

    overflow: hidden;
    text-overflow: ellipsis;

    align-items: center;
    vertical-align: middle;
`;