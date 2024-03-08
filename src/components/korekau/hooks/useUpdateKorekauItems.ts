import { useAtom } from "jotai";
import { korekauAtom, korekauItemsLocalStorageAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";
import { localstorageLabel_KorekauItems } from "../../../ts/korekau-localstorageLabel";
import { useGetTargetIndexForCtrlItems } from "./useGetTargetIndexForCtrlItems";

export const useUpdateKorekauItems = () => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);
    const [, setLocalstorage] = useAtom(korekauItemsLocalStorageAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    const { getTargetIndexForCtrlItems } = useGetTargetIndexForCtrlItems();

    const updateKorekauItems = (
        KorekauItemList: korekauItemsType,
        updateItemName: string,
        updateItemNumber: number,
        updateItemCategory: string,
        updateItemPriority: boolean,
        itemImgSrc?: string
    ) => {
        const targetIndex: number = getTargetIndexForCtrlItems(KorekauItemList);

        const updateKorekauItem: korekauItemsType = {
            itemName: updateItemName,
            itemNumber: updateItemNumber,
            itemCategory: updateItemCategory,
            itemPriority: updateItemPriority,
            itemImg: itemImgSrc
        }

        const shallowCopy: korekauItemsType[] = [...korekauLists];
        shallowCopy.splice(targetIndex, 1, updateKorekauItem);
        if (updateItemName.length > 0) {
            setKorekauLists((_prevKorekauLists) => shallowCopy);
            /* ---------------- localStorage 関連の処理（更新）---------------- */
            setLocalstorage((_prevLocalStorage) => shallowCopy);
            localStorage.setItem(localstorageLabelKorekauItems, JSON.stringify([...shallowCopy]));
        }
    }

    return { updateKorekauItems }
}