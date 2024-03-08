import styled from "styled-components";
import { memo } from "react";
import { useAtom } from "jotai";
import { trashDateLocalStorageAtom } from "../../../ts/trash-atom";
import { localstorageLabel_TrashDate } from "../../../ts/trash-localstorageLabel";

export const TrashDateListsAllReset = memo(() => {
    const [, setLocalstorage] = useAtom(trashDateLocalStorageAtom);

    const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

    const handleAllReset: () => void = () => {
        const result: boolean = confirm('設定中のゴミ出し日をリセットしてもよろしいですか？');
        if (result) {
            localStorage.removeItem(localstorageLabelTrashDate);
            setLocalstorage((_prevLocalstorage) => []);
            alert('設定中のゴミ出し日をリセットしました');
            location.reload();
        }
    }

    return <TrashDateListsAllResetBtn type="button" onClick={handleAllReset}>設定中のゴミ出し日をリセット</TrashDateListsAllResetBtn>
});

const TrashDateListsAllResetBtn = styled.button`
appearance: none;
width: fit-content;
background-color: #cc3226;
border: 1px solid transparent;
color: #fff;
cursor: pointer;
padding: 0 1em;
margin-bottom: 2.5em;
border-radius: .4rem;
line-height: 4.4rem;
font-size: 1.4rem;

@media screen and (min-width: 1025px) {
    border-radius: 4px;
    line-height: 44px;
    font-size: 14px;
}
`;