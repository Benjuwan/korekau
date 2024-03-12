import styled from "styled-components";
import { memo } from "react";
import { korekauItemsType } from "../ts/korekau";
import { useKorekauMemoView } from "../hooks/useKorekauMemoView";

export const PartKorekauItemsMemo = memo(({ korekauList }: { korekauList: korekauItemsType }) => {
    const { korekauMemoView } = useKorekauMemoView();

    return (
        <KorekauMemo className="korekauMemo">
            <button type="button" onClick={(btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>) => korekauMemoView(btnEl.currentTarget)}><span className="material-symbols-outlined">chat</span>注釈メモ</button>
            <div className="korekauMemoContenet">
                <button type="button" onClick={(btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>) => korekauMemoView(btnEl.currentTarget)}><span className="material-symbols-outlined">close</span></button>
                {korekauList.itemMemo}
            </div>
        </KorekauMemo>
    );
});

const KorekauMemo = styled.div`
margin: .5em 0;
width: 100%;

&.OnView {
    & .korekauMemoContenet {
        transform: translate(-50%, 3.6em);
        opacity: 1;
        visibility: visible;
        z-index: 9;
    }
}

    & button {
        & span {
            margin-right: .5em;
        }
    }

    & .korekauMemoContenet {
        position: absolute;
        top: 0;
        left: 50%;
        z-index: -1;
        transform: translate(-50%, 5em);
        width: 100%;
        height: fit-content;
        max-height: 24rem;
        border-radius: .8rem;
        overflow-y: scroll;
        padding: 1em;
        color: #fff;
        background-color: rgba(80, 80, 80, .85);
        opacity: 0;
        visibility: hidden;
        transition: all .25s;

        & button {
            display: block;
            margin-bottom: 1em;
        }
    }

@media screen and (min-width: 1025px) {
    & .korekauMemoContenet {
        max-height: 240px;
        border-radius: 8px;
    }
}
`;