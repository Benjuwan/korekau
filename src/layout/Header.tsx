import styled from "styled-components";
import { memo } from "react";
import { FilteredTrashDayList } from "../components/trash/utils/FilteredTrashDayList";

import rogo from "../../public/img/favi.svg";

export const Header = memo(() => {
    return (
        <HeaderElm>
            <h1><figure><img src={rogo} alt="KoreKauのロゴ" /></figure></h1>
            <FilteredTrashDayList />
        </HeaderElm>
    );
});

const HeaderElm = styled.header`
    & h1 {
        max-width: 32rem;
        margin: 2em auto;
        text-align: center;

        & figure {
            & img {
                width: 3.2em;
                box-shadow: 0 0 8px rgba(160, 160, 160, .25) inset;
                border-radius: 50%;
                aspect-ratio: 1 / 1;
                padding: .25em;
            }
        }
    }

@media screen and (min-width: 1025px) {
    & h1 {
        max-width: 320px;
    }
}
`