import { useAtom } from "jotai";
import { korekauAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";

export const useRegiKorekauItem = () => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);

    const regiKorekauItem: (itemName: string, itemNumber: number, itemCategory: string, itemPriority: boolean) => void = (
        itemName: string,
        itemNumber: number,
        itemCategory: string,
        itemPriority: boolean
    ) => {
        const newKorekauItems: korekauItemsType = {
            itemName: itemName,
            itemNumber: itemNumber,
            itemCategory: itemCategory,
            itemPriority: itemPriority
        }

        if (itemName.length > 0) {
            setKorekauLists((_prevKorekauLists) => [...korekauLists, newKorekauItems]);
        }
    }

    return { regiKorekauItem }
}