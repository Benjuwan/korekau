import { trashType } from "../ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom, trashDateLocalStorageAtom } from "../../../ts/trash-atom";
import { localstorageLabel_TrashDate } from "../../../ts/trash-localstorageLabel";
import { useTargetElsRemoveClass } from "../../../hooks/useTargetElsRemoveClass";

export const useDeleteTrashDate = () => {
    const { targetElsRemoveClass } = useTargetElsRemoveClass();

    const [trashDateLists, setTrashDateLists] = useAtom(trashDateAtom);
    const [, setLocalstorage] = useAtom(trashDateLocalStorageAtom);

    const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

    const deleteTrashDate: (index: number) => void = (index: number) => {
        const shallowCopy: trashType[] = [...trashDateLists];
        shallowCopy.splice(index, 1);
        setTrashDateLists((_prevTrashDateLists) => shallowCopy);
        targetElsRemoveClass('editerView', 'OnView');
        /* ---------------- localStorage 関連の処理（更新）---------------- */
        if (trashDateLists.length <= 1) {
            localStorage.removeItem(localstorageLabelTrashDate);
            setLocalstorage((_prevLocalstorage) => []);
            return;
        }

        setLocalstorage((_prevLocalStorage) => shallowCopy);
        localStorage.setItem(localstorageLabelTrashDate, JSON.stringify([...shallowCopy]));
    }

    return { deleteTrashDate }
}