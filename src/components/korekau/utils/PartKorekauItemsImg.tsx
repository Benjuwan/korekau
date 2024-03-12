import styled from "styled-components";
import { memo } from "react";
import { korekauItemsType } from "../ts/korekau";

export const PartKorekauItemsImg = memo(({ korekauList }: { korekauList: korekauItemsType }) => {
    return (
        <KorekauDetails>
            <summary><span className="material-symbols-outlined">mms</span>参照画像</summary>
            <figure className="itemThumbnail"><img src={korekauList.itemImg} alt={`${korekauList.itemName}の画像`} /></figure>
        </KorekauDetails>
    );
});

const KorekauDetails = styled.details`
    /* Chrome、Safari */
    summary::-webkit-details-marker {
        display: none;
    }
    
    /* Chrome、Safari以外 */
    summary {
        display: block; // display:list-item を display:block で上書き
    }

    & summary {
        cursor: pointer;
        font-size: 1.4rem;

        & span {
            margin-right: .5em;
        }
    }

    & .itemThumbnail {
        margin-top: .5em;
        max-width: 48rem;
    }

@media screen and (min-width: 1025px) {
    & summary {
        font-size: 14px;
    }

    & .itemThumbnail {
        max-width: 480px;
    }
}
`;