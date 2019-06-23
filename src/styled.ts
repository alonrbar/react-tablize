import styled, { CreateStyled } from '@emotion/styled';

export interface Theme {
    dir: DocDir;
    hairlines?: boolean;
}

const styledWithTheme = (styled as CreateStyled<Theme>);

export { styledWithTheme as styled };