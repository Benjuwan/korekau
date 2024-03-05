import { memo } from "react";
import { korekauItemsType } from "../ts/korekau";
import { KorekauForm } from "./KorekauForm";
import { KorekauItemIcons } from "./KorekauItemIcons";
import styled from "styled-components";

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
                <p>{korekauList.itemName}</p>
            </div>
            <KorekauForm KorekauItemList={korekauList} />
        </KorekauItemEditerElm>
    );
});

const KorekauItemEditerElm = styled.div`
padding-right: 1em;

    & .itembox {
        padding: 1em;
        box-shadow: 0 0 8px rgba(0, 0, 0, .25) inset;
        background-color: #eaeaea;
        margin-bottom: 1em;
        border-radius: .4rem;

        & p {
            width: 80%;
            overflow-wrap: break-word; // 区切りがないとブラウザは一文として処理するので改行指定のスタイルを指定しておく
        }
        
        @media screen and (min-width: 960px) {
            border-radius: 4px;
        }
    }
`;