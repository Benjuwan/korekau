import { useAtom } from "jotai";
import { korekauAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";
import { useGetTargetIndexForCtrlItems } from "./useGetTargetIndexForCtrlItems";

export const useDeleteItem = () => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);
    const { getTargetIndexForCtrlItems } = useGetTargetIndexForCtrlItems();

    const deleteItem = (itemName: string) => {
        const targetIndex: number = getTargetIndexForCtrlItems(itemName);
        const shallowCopy: korekauItemsType[] = [...korekauLists];
        shallowCopy.splice(targetIndex, 1);
        setKorekauLists((_prevKorekauLists) => shallowCopy);
    }

    return { deleteItem }
}