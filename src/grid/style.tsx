import styled from '@emotion/styled';
import { SizeUtils } from '../utils';

//
// constants
//

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

    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${SizeUtils.scrollbarWidth}px;
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

// https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll
export const FrozenColumnsWrapper = styled.div`
    overflow: hidden;
`;