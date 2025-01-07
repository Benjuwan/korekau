import { trashType } from "../ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom, trashDateLocalStorageAtom } from "../../../ts/trash-atom";
import { localstorageLabel_TrashDate } from "../../../ts/trash-localstorageLabel";

export const useUpdateTrashDate = () => {
    const [trashDateLists, setTrashDateLists] = useAtom(trashDateAtom);
    const [, setLocalstorage] = useAtom(trashDateLocalStorageAtom);

    const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

    const updateTrashDate: (trashData: trashType) => void = (trashData: trashType) => {
        const updatetrashDateLists: trashType = { ...trashData }

        const exceptRemoveTrashDataItems: trashType[] = [...trashDateLists].filter(trashDataItem => trashDataItem.uuid !== trashData.uuid);

        /* ----------------------- 以下（変数：shallowCopy を用いた方法）は map 処理時の index を用いた方法（※React では原則 key={i} は NG（key に index を渡すのは非推奨）なので上記の uuid を用いた方法を採用）----------------------- */
        // const shallowCopy: trashType[] = [...trashDateLists];
        // shallowCopy.splice(index, 1, updatetrashDateLists);

        if (updatetrashDateLists.trashDate.length > 0) {
            // setTrashDateLists(shallowCopy);
            setTrashDateLists([...exceptRemoveTrashDataItems, updatetrashDateLists]);

            /* ---------------- localStorage 関連の処理（更新）---------------- */
            // setLocalstorage(shallowCopy);
            // localStorage.setItem(localstorageLabelTrashDate, JSON.stringify([...shallowCopy]));
            setLocalstorage([...exceptRemoveTrashDataItems, updatetrashDateLists]);
            localStorage.setItem(localstorageLabelTrashDate, JSON.stringify([...exceptRemoveTrashDataItems, updatetrashDateLists]));
        }
    }

    return { updateTrashDate }
}