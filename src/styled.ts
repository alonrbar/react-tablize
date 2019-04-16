import styled, { CreateStyled } from '@emotion/styled';

export interface Theme {
    dir: DocDir;
}

const styledWithTheme = (styled as CreateStyled<Theme>);

export { styledWithTheme as styled };