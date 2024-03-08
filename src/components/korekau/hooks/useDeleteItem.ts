import { useAtom } from "jotai";
import { korekauAtom, korekauItemsLocalStorageAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";
import { localstorageLabel_KorekauItems } from "../../../ts/korekau-localstorageLabel";
import { useGetTargetIndexForCtrlItems } from "./useGetTargetIndexForCtrlItems";

export const useDeleteItem = () => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);
    const [, setLocalstorage] = useAtom(korekauItemsLocalStorageAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    const { getTargetIndexForCtrlItems } = useGetTargetIndexForCtrlItems();

    const deleteItem = (korekauItem: korekauItemsType) => {
        const targetIndex: number = getTargetIndexForCtrlItems(korekauItem);
        const shallowCopy: korekauItemsType[] = [...korekauLists];
        shallowCopy.splice(targetIndex, 1);
        setKorekauLists((_prevKorekauLists) => shallowCopy);
        /* ---------------- localStorage 関連の処理（更新）---------------- */
        if (korekauLists.length <= 1) {
            localStorage.removeItem(localstorageLabelKorekauItems);
            setLocalstorage((_prevLocalstorage) => []);
            return;
        }

        setLocalstorage((_prevLocalStorage) => shallowCopy);
        localStorage.setItem(localstorageLabelKorekauItems, JSON.stringify([...shallowCopy]));
    }

    return { deleteItem }
}