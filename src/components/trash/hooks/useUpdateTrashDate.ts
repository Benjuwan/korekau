import { trashType } from "../ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom, trashDateLocalStorageAtom } from "../../../ts/trash-atom";
import { localstorageLabel_TrashDate } from "../../../ts/trash-localstorageLabel";

export const useUpdateTrashDate = () => {
    const [trashDateLists, setTrashDateLists] = useAtom(trashDateAtom);
    const [, setLocalstorage] = useAtom(trashDateLocalStorageAtom);

    const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

    const updateTrashDate: (trashDateUuid: string, updateDay: number, updateTrashDate: string) => void = (
        trashDateUuid: string,
        updateDay: number,
        updateTrashDate: string
    ) => {
        const updatetrashDateLists: trashType = {
            uuid: trashDateUuid,
            day: updateDay,
            trashDate: updateTrashDate
        }

        const exceptRemoveTrashDataItems: trashType[] = [...trashDateLists].filter(trashDataItem => trashDataItem.uuid !== trashDateUuid);

        /* ----------------------- 以下（変数：shallowCopy を用いた方法）は map 処理時の index を用いた方法（※React では原則 key={i} は NG（key に index を渡すのは非推奨）なので上記の uuid を用いた方法を採用）----------------------- */
        // const shallowCopy: trashType[] = [...trashDateLists];
        // shallowCopy.splice(index, 1, updatetrashDateLists);

        if (updateTrashDate.length > 0) {
            // setTrashDateLists((_prevtrashDateLists) => shallowCopy);
            setTrashDateLists((_prevtrashDateLists) => [...exceptRemoveTrashDataItems, updatetrashDateLists]);
            
            /* ---------------- localStorage 関連の処理（更新）---------------- */
            // setLocalstorage((_prevLocalStorage) => shallowCopy);
            // localStorage.setItem(localstorageLabelTrashDate, JSON.stringify([...shallowCopy]));
            setLocalstorage((_prevLocalStorage) => [...exceptRemoveTrashDataItems, updatetrashDateLists]);
            localStorage.setItem(localstorageLabelTrashDate, JSON.stringify([...exceptRemoveTrashDataItems, updatetrashDateLists]));
        }
    }

    return { updateTrashDate }
}