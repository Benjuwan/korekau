import styled from "styled-components";
import { memo } from "react";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { SwiperLibs } from "./libs/SwiperLibs";

export const GlobalWrapper = memo(() => {
    return (
        <>
            <Header />
            <GlobalWrapperElm>
                <SwiperLibs />
            </GlobalWrapperElm>
            <Footer />
        </>
    );
});

const GlobalWrapperElm = styled.main`
width: clamp(30rem, 100%, 60rem);
margin: 2.5em auto 0;

@media screen and (min-width: 1025px) {
    width: clamp(300px, 100%, 960px);
}
`