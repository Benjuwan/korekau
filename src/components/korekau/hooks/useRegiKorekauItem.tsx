import { useAtom } from "jotai";
import { korekauAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";

export const useRegiKorekauItem = () => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);

    const regiKorekauItem: (itemName: string, itemNumber: number, itemCategory: string, setItemName: React.Dispatch<React.SetStateAction<string>>, setItemNumber: React.Dispatch<React.SetStateAction<number>>) => void = (
        itemName: string,
        itemNumber: number,
        itemCategory: string,
        setItemName: React.Dispatch<React.SetStateAction<string>>,
        setItemNumber: React.Dispatch<React.SetStateAction<number>>
    ) => {
        const newKorekauItems: korekauItemsType = {
            itemName: itemName,
            itemNumber: itemNumber,
            itemCategory: itemCategory
        }

        if (itemName.length > 0) {
            setKorekauLists((_prevKorekauLists) => [...korekauLists, newKorekauItems]);
            setItemName('');
            setItemNumber(1);
        }
    }

    return { regiKorekauItem }
}