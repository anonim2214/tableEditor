'use client';

import React, { ReactNode } from 'react';
import { Global } from '@emotion/react';
import tw, { css, theme, GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css({
    body: {
        WebkitTapHighlightColor: theme`colors.purple.500`,
        background: 'white',
        ...tw`antialiased`,
    },
});
const customStyles2 = css`
  input:focus { 
    outline: none;
  }
`;

const styles = tw`px-[20px] max-w-[1500px] mx-auto`;

const GlobalStyles = ({ children }: {
    children: ReactNode | ReactNode[];
}) => (
    <>
        <BaseStyles />
        <Global styles={[customStyles, customStyles2]} />
        <div css={styles}>
            {children}
        </div>
    </>
);

export default GlobalStyles;
