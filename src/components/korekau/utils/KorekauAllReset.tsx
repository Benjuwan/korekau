import styled from "styled-components";
import { memo } from "react";
import { useAtom } from "jotai";
import { korekauItemsLocalStorageAtom } from "../../../ts/korekau-atom";
import { localstorageLabel_KorekauItems } from "../../../ts/korekau-localstorageLabel";

export const KorekauAllReset = memo(() => {
    const [, setLocalstorage] = useAtom(korekauItemsLocalStorageAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    const handleAllReset: () => void = () => {
        const result: boolean = confirm('リストを全削除してもよろしいですか？');
        if (result) {
            localStorage.removeItem(localstorageLabelKorekauItems);
            setLocalstorage((_prevLocalstorage) => []);
            alert('リストを全削除しました');
            location.reload();
        }
    }

    return <KorekauAllResetBtn type="button" onClick={handleAllReset}>リストを全削除</KorekauAllResetBtn>
});

const KorekauAllResetBtn = styled.button`
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