import { trashType } from "../ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom, trashDateLocalStorageAtom } from "../../../ts/trash-atom";
import { localstorageLabel_TrashDate } from "../../../ts/trash-localstorageLabel";

export const useRegiTrashDate = () => {
    const [trashDateLists, setTrashDateLists] = useAtom(trashDateAtom);
    const [, setLocalstorage] = useAtom(trashDateLocalStorageAtom);

    const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

    const regiTrashDate: (regiDay: number, regiTrashDate: string) => void = (
        regiDay: number,
        regiTrashDate: string
    ) => {
        const newtrashDateLists: trashType = {
            day:regiDay,
            trashDate:regiTrashDate
        }

        if (regiTrashDate.length > 0) {
            setTrashDateLists((_prevtrashDateLists) => [...trashDateLists, newtrashDateLists]);
            /* ---------------- localStorage 関連の処理（登録）---------------- */
            setLocalstorage((_prevLocalStorage) => [...trashDateLists, newtrashDateLists]);
            localStorage.setItem(localstorageLabelTrashDate, JSON.stringify([...trashDateLists, newtrashDateLists]));
        }
    }

    return { regiTrashDate }
}