import { v4 as uuidv4 } from 'uuid';
import { trashType } from "../ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom, trashDateLocalStorageAtom } from "../../../ts/trash-atom";
import { localstorageLabel_TrashDate } from "../../../ts/trash-localstorageLabel";

export const useRegiTrashDate = () => {
    const [trashDateLists, setTrashDateLists] = useAtom(trashDateAtom);
    const [, setLocalstorage] = useAtom(trashDateLocalStorageAtom);

    const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

    const regiTrashDate: (trashData: trashType) => void = (trashData: trashType) => {
        const shallowCopyTrashData: trashType = { ...trashData }

        const newtrashDateLists: trashType = {
            ...shallowCopyTrashData,
            uuid: uuidv4() // key に渡すための固有の識別子を生成
        }

        if (shallowCopyTrashData.trashDate.length > 0) {
            setTrashDateLists([...trashDateLists, newtrashDateLists]);
            /* ---------------- localStorage 関連の処理（登録）---------------- */
            setLocalstorage([...trashDateLists, newtrashDateLists]);
            localStorage.setItem(localstorageLabelTrashDate, JSON.stringify([...trashDateLists, newtrashDateLists]));
        }
    }

    return { regiTrashDate }
}