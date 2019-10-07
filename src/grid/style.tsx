import styled from '@emotion/styled';
import { SizeUtils } from '../utils';

export const StyledGridView = styled.div`
    width: 100%;
`;

export const StyledGridHead = styled.div`
    display: flex;

    /* add padding to compensate for scrollbar width */
    ${props => (props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right')}: ${SizeUtils.scrollbarWidth}px;
`;

export const StyledGridBody = styled.div`
    /* no style... */
`;

export const StyledGridCell = styled.div`
    display: flex;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`;