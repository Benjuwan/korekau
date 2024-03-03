import { memo } from "react";
import { SwiperLibs } from "./libs/SwiperLibs";
import styled from "styled-components";

export const GlobalWrapper = memo(() => {
    return (
        <GlobalWrapperElm>
            <SwiperLibs />
        </GlobalWrapperElm>
    );
});

const GlobalWrapperElm = styled.main`
width: clamp(300px, 100%, 600px);
margin: 2.5em auto 0;
padding: 0 1em;
`