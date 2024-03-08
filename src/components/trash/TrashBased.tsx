import { memo, useEffect } from "react";
import { trashType } from "./ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom } from "../../ts/trash-atom";
import { TrashForm } from "./utils/TrashForm";
import { TrashDateLists } from "./utils/TrashDateLists";
import { TrashDateListsAllReset } from "./utils/TrashDateListsAllReset";
import { localstorageLabel_TrashDate } from "../../ts/trash-localstorageLabel";

export const TrashBased = memo(() => {
    const [trashDateLists, setTrashDateLists] = useAtom(trashDateAtom);

    const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

    useEffect(() => {
        /* localStorage にデータがあればその内容を子コンポーネント（KorekauItems）に渡す */
        const getLocalStorageItems: string | null = localStorage.getItem(localstorageLabelTrashDate);
        if (getLocalStorageItems !== null) {
            const SaveLocalStorageDateItems: trashType[] = JSON.parse(getLocalStorageItems);
            setTrashDateLists((_prevTrashDateLists) => [...SaveLocalStorageDateItems]);
        }
    }, []);

    return (
        <>
            <TrashForm />
            {trashDateLists.length > 0 ?
                <>
                    <TrashDateListsAllReset />
                    <p>現在設定されているゴミ出し日は以下です。</p>
                    <TrashDateLists />
                </> :
                <p style={{ 'textAlign': 'center' }}>ゴミ出し日はまだ設定されていません。</p>
            }
        </>
    );
});