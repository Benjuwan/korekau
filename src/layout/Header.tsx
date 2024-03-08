import styled from "styled-components";
import { memo } from "react";
import { FilteredTrashDayList } from "../components/trash/utils/FilteredTrashDayList";

import rogo from "../assets/rogo.svg";

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
        max-width: 48rem;
        margin: 2.5em auto;
        text-align: center;

        & figure {
            & img {
                width: 16em;
            }
        }
    }

@media screen and (min-width: 1025px) {
    & h1 {
        max-width: 480px;
    }
}
`