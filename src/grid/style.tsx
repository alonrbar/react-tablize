import styled from '@emotion/styled';

//
// constants
//

export const scrollbarWidth = 17;
const tableBorder = '1px solid #ddd';

//
// grid
//

export const StyledGridView = styled.div`
    width: 100%;
`;

export const StyledGridCell = styled.div`
    display: flex;

    height: 100%;

    overflow: hidden;
    text-overflow: ellipsis;

    align-items: center;
    vertical-align: middle;
`;

//
// head
//

export const StyledGridHead = styled.div`
    display: flex;

    font-weight: bold;
    vertical-align: middle;

    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${scrollbarWidth}px;
    border-bottom: ${tableBorder};

    & ${StyledGridCell} {
        align-items: flex-end;
    }
`;

//
// body
//

export const StyledGridBody = styled.div`
`;