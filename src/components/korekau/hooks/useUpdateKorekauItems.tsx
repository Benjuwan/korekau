import { useAtom } from "jotai";
import { korekauAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";
import { useGetTargetIndexForCtrlItems } from "./useGetTargetIndexForCtrlItems";
import { useTargetElsRemoveClass } from "./useTargetElsRemoveClass";

export const useUpdateKorekauItems = () => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);
    const { getTargetIndexForCtrlItems } = useGetTargetIndexForCtrlItems();
    const { targetElsRemoveClass } = useTargetElsRemoveClass();

    const updateKorekauItems: (KorekauItemList: korekauItemsType, updateItemName: string, updateItemNumber: number, updateItemCategory: string, updateItemPriority: boolean) => void = (
        KorekauItemList: korekauItemsType,
        updateItemName: string,
        updateItemNumber: number,
        updateItemCategory: string,
        updateItemPriority: boolean
    ) => {
        const targetIndex: number = getTargetIndexForCtrlItems(KorekauItemList.itemName);

        const updateKorekauItem: korekauItemsType = {
            itemName: updateItemName,
            itemNumber: updateItemNumber,
            itemCategory: updateItemCategory,
            itemPriority: updateItemPriority
        }

        const shallowCopy: korekauItemsType[] = [...korekauLists];
        shallowCopy.splice(targetIndex, 1, updateKorekauItem);
        if (updateItemName.length > 0) {
            setKorekauLists((_prevKorekauLists) => shallowCopy);
            targetElsRemoveClass('editerView', 'OnView');
        }
    }

    return { updateKorekauItems }
}