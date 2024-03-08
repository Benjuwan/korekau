import { trashType } from "../ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom, trashDateLocalStorageAtom } from "../../../ts/trash-atom";
import { localstorageLabel_TrashDate } from "../../../ts/trash-localstorageLabel";

export const useUpdateTrashDate = () => {
    const [trashDateLists, setTrashDateLists] = useAtom(trashDateAtom);
    const [, setLocalstorage] = useAtom(trashDateLocalStorageAtom);

    const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

    const updateTrashDate: (index: number, updateDay: number, updateTrashDate: string) => void = (
        index: number,
        updateDay: number,
        updateTrashDate: string
    ) => {
        const updatetrashDateLists: trashType = {
            day: updateDay,
            trashDate: updateTrashDate
        }

        const shallowCopy: trashType[] = [...trashDateLists];
        shallowCopy.splice(index, 1, updatetrashDateLists);
        if (updateTrashDate.length > 0) {
            setTrashDateLists((_prevtrashDateLists) => shallowCopy);
            /* ---------------- localStorage 関連の処理（更新）---------------- */
            setLocalstorage((_prevLocalStorage) => shallowCopy);
            localStorage.setItem(localstorageLabelTrashDate, JSON.stringify([...shallowCopy]));
        }
    }

    return { updateTrashDate }
}