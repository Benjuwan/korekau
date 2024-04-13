import styled from "styled-components";
import { memo, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { trashDateAtom } from "../../../ts/trash-atom";
import { trashType } from "../ts/trash";
import { TrashDateEditer } from "./TrashDateEditer";
import { TrashDateDetails } from "./TrashDateDetails";
import { EditerViewer } from "../../../utils/EditerViewer";

export const TrashDateLists = memo(() => {
    const [trashDateLists] = useAtom(trashDateAtom);

    const [trashDateSortedLists, setTrashDateSortedLists] = useState<trashType[]>([]);
    useEffect(() => {
        const sortedTrashDate: trashType[] = trashDateLists.sort((aheadList, behindList) => {
            return aheadList.day - behindList.day;
        });
        setTrashDateSortedLists((_prevTrashDateSortedLists) => sortedTrashDate);
    }, [trashDateLists]);

    return (
        <TrashDateList>
            {trashDateSortedLists.map(trashDateList => (
                <li key={trashDateList.uuid}>
                    <TrashDateDetails trashDateList={trashDateList} />
                    <EditerViewer children={
                        <TrashDateEditer props={{
                            classNameStr: 'itemEditer',
                            trashDateList: trashDateList,
                            trashDateUuid: trashDateList.uuid
                        }} />
                    } />
                </li>
            ))}
        </TrashDateList>
    );
});

const TrashDateList = styled.ul`
list-style: none;
font-size: 1.6rem;

    & li {
        padding: 1em;
        box-shadow: 0 0 8px rgba(160, 160, 160, .5) inset;
        border-radius: .4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1em;

        &:not(:last-of-type){
            margin-bottom: 1em;
        }

        & p {
            overflow-wrap: anywhere; // 区切りがないとブラウザは一文として処理するので改行指定のスタイルを指定しておく
            & span {
                font-weight: bold;
            }
        }
    }

@media screen and (min-width: 1025px) {
    font-size: 16px;

    & li {
        border-radius: 4px;
    }
}
`