import { useAtom } from "jotai";
import { korekauAtom, korekauItemsLocalStorageAtom } from "../../../ts/korekau-atom";
import { itemCategoryType, korekauItemsType } from "../ts/korekau";
import { localstorageLabel_KorekauItems } from "../../../ts/korekau-localstorageLabel";
import { useGetTargetIndexForCtrlItems } from "./useGetTargetIndexForCtrlItems";
import { useCheckJSONByteSize } from "./useCheckJSONByteSize";

export const useUpdateKorekauItems = () => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);
    const [, setLocalstorage] = useAtom(korekauItemsLocalStorageAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    const { getTargetIndexForCtrlItems } = useGetTargetIndexForCtrlItems();
    const { checkJSONByteSize } = useCheckJSONByteSize();

    const updateKorekauItems: (KorekauItemList: korekauItemsType, updateItemName: string, updateItemNumber: number, updateItemCategory: itemCategoryType, updateItemPriority: boolean, itemImgMemo?: string, itemImgSrc?: string) => void = (
        KorekauItemList: korekauItemsType,
        updateItemName: string,
        updateItemNumber: number,
        updateItemCategory: itemCategoryType,
        updateItemPriority: boolean,
        itemImgMemo?: string,
        itemImgSrc?: string
    ) => {
        const targetIndex: number = getTargetIndexForCtrlItems(KorekauItemList);

        const updateKorekauItem: korekauItemsType = {
            uuid: KorekauItemList.uuid,
            itemName: updateItemName,
            itemNumber: updateItemNumber,
            itemCategory: updateItemCategory,
            itemPriority: updateItemPriority,
            itemMemo: itemImgMemo,
            itemImg: itemImgSrc
        }

        const shallowCopy: korekauItemsType[] = [...korekauLists];
        shallowCopy.splice(targetIndex, 1, updateKorekauItem);
        if (updateItemName.length > 0) {
            setKorekauLists((_prevKorekauLists) => shallowCopy);
            /* ---------------- localStorage 関連の処理（更新）---------------- */
            checkJSONByteSize(JSON.stringify([...shallowCopy])); // localStorage のストレージ上限チェック
            setLocalstorage((_prevLocalStorage) => shallowCopy);
            localStorage.setItem(localstorageLabelKorekauItems, JSON.stringify([...shallowCopy]));
        }
    }

    return { updateKorekauItems }
}