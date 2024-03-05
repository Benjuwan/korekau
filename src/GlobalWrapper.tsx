import styled from "styled-components";
import { memo } from "react";
import { SwiperLibs } from "./libs/SwiperLibs";

import rogo from "./assets/rogo.svg";

export const GlobalWrapper = memo(() => {
    return (
        <GlobalWrapperElm>
            <h1><figure><img src={rogo} alt="KoreKauのロゴ" /></figure></h1>
            <SwiperLibs />
        </GlobalWrapperElm>
    );
});

const GlobalWrapperElm = styled.main`
width: clamp(30rem, 100%, 60rem);
margin: 2.5em auto 0;
padding: 0 1em;

    & h1 {
        padding: 1em 2.5em;
        max-width: 48rem;
        margin: 0 auto 2.5em;
    }

@media screen and (min-width: 960px) {
    width: clamp(300px, 100%, 600px);

    & h1 {
        max-width: 480px;
    }
}
`