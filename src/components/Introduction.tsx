import styled from "styled-components";
import { memo } from "react";

import rogo from "../assets/rogo.svg";

export const Introduction = memo(() => {
    return (
        <IntroductionWrapper>
            <h2>Introduction</h2>
            <figure className="rogoThumbnail"><img src={rogo} alt="KoreKau のロゴ" /></figure>
        </IntroductionWrapper>
    );
});

const IntroductionWrapper = styled.section`
padding: 0 1em;

    & .rogoThumbnail {
        text-align: center;
        margin: 1em 0;
        
        & img {
            width: clamp(24rem, 100%, 40rem);
        }
    }

@media screen and (min-width: 1025px) {
    font-size: 1.4rem;
    
    & .rogoThumbnail {
        & img {
            width: clamp(240px, 100%, 400px);
        }
    }
}
`;