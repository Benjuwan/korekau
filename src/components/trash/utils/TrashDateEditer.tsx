import styled from "styled-components";
import { memo } from "react";
import { trashType } from "../ts/trash";
import { TrashForm } from "./TrashForm";
import { TrashDateDetails } from "./TrashDateDetails";

type trashDateType = {
    classNameStr: string;
    trashDateList: trashType;
    trashDateIndex: number;
}

export const TrashDateEditer = memo(({ props }: { props: trashDateType }) => {
    const { classNameStr, trashDateList, trashDateIndex } = props;

    return (
        <TrashDateEditerElm className={classNameStr}>
            <div className="itembox flexBox">
                <TrashDateDetails trashDateList={trashDateList} />の内容を編集
            </div>
            <TrashForm trashDateList={trashDateList} trashDateIndex={trashDateIndex} />
        </TrashDateEditerElm>
    );
});

const TrashDateEditerElm = styled.div`
    & .itembox {
        padding: 1em;
        box-shadow: 0 0 8px rgba(0, 0, 0, .25) inset;
        background-color: #fff;
        margin-bottom: 1em;
        border-radius: .4rem;

        & p {
            display: inline-block;
            overflow-wrap: anywhere; // 区切りがないとブラウザは一文として処理するので改行指定のスタイルを指定しておく
            line-height: 1.6;
            margin-right: 1em;
        }
        
        @media screen and (min-width: 1025px) {
            border-radius: 4px;
        }
    }
`;