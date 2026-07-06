import { memo, useEffect } from "react";
import { trashType } from "../ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom } from "../../../ts/trash-atom";
import { localstorageLabel_TrashDate } from "../../../ts/trash-localstorageLabel";
import { TrashDateListsAllReset } from "./TrashDateListsAllReset";
import { TrashDateLists } from "./TrashDateLists";

export const TrashDataItems = memo(() => {
    const [trashDateLists, setTrashDateLists] = useAtom(trashDateAtom);

    const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

    useEffect(() => {
        /* localStorage にデータがあればその内容を子コンポーネント（KorekauItems）に渡す */
        const getLocalStorageItems: string | null = localStorage.getItem(localstorageLabelTrashDate);
        if (getLocalStorageItems !== null) {
            const SaveLocalStorageDateItems: trashType[] = JSON.parse(getLocalStorageItems);
            setTrashDateLists([...SaveLocalStorageDateItems]);
        }
    }, [localstorageLabelTrashDate, setTrashDateLists]);

    if (trashDateLists.length === 0) {
        return <p style={{ 'textAlign': 'center' }}>ゴミ出し日はまだ設定されていません。</p>
    }

    return (
        <>
            <TrashDateListsAllReset />
            <p>現在設定されているゴミ出し日は以下です。</p>
            <TrashDateLists />
        </>
    );
});
