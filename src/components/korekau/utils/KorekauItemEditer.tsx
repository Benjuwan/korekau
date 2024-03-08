import styled from "styled-components";
import { memo } from "react";
import { korekauItemsType } from "../ts/korekau";
import { KorekauForm } from "./KorekauForm";
import { KorekauItemIcons } from "./KorekauItemIcons";

type itemEditerType = {
    classNameStr: string;
    category: string;
    korekauList: korekauItemsType;
}

export const KorekauItemEditer = memo(({ props }: { props: itemEditerType }) => {
    const { classNameStr, category, korekauList } = props;

    return (
        <KorekauItemEditerElm className={classNameStr}>
            <div className="itembox flexBox">
                <KorekauItemIcons category={category} />
                <p>{korekauList.itemName}<span>×{korekauList.itemNumber}</span>の内容を編集</p>
            </div>
            <KorekauForm KorekauItemList={korekauList} />
        </KorekauItemEditerElm>
    );
});

const KorekauItemEditerElm = styled.div`
    & .itembox {
        padding: 1em;
        box-shadow: 0 0 8px rgba(0, 0, 0, .25) inset;
        background-color: #fff;
        margin-bottom: 1em;
        border-radius: .4rem;

        & p {
            width: 80%;
            overflow-wrap: anywhere; // 区切りがないとブラウザは一文として処理するので改行指定のスタイルを指定しておく

            & span {
                margin: 0 1em;
                color: #59b835;
            }
        }
        
        @media screen and (min-width: 1025px) {
            border-radius: 4px;
        }
    }
`;