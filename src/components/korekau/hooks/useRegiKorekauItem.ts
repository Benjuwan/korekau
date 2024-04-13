import { v4 as uuidv4 } from 'uuid';
import { useAtom } from "jotai";
import { korekauAtom, korekauItemsLocalStorageAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";
import { localstorageLabel_KorekauItems } from "../../../ts/korekau-localstorageLabel";

export const useRegiKorekauItem = () => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);
    const [, setLocalstorage] = useAtom(korekauItemsLocalStorageAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    const regiKorekauItem: (itemName: string, itemNumber: number, itemCategory: string, itemPriority: boolean, itemImgMemo?: string, itemImgSrc?: string) => void = (
        itemName: string,
        itemNumber: number,
        itemCategory: string,
        itemPriority: boolean,
        itemImgMemo?: string,
        itemImgSrc?: string
    ) => {
        const newKorekauItems: korekauItemsType = {
            uuid: uuidv4(), // key に渡すための固有の識別子
            itemName: itemName,
            itemNumber: itemNumber,
            itemCategory: itemCategory,
            itemPriority: itemPriority,
            itemMemo: itemImgMemo,
            itemImg: itemImgSrc
        }

        if (itemName.length > 0) {
            setKorekauLists((_prevKorekauLists) => [...korekauLists, newKorekauItems]);
            /* ---------------- localStorage 関連の処理（登録）---------------- */
            setLocalstorage((_prevLocalStorage) => [...korekauLists, newKorekauItems]);
            localStorage.setItem(localstorageLabelKorekauItems, JSON.stringify([...korekauLists, newKorekauItems]));
        }
    }

    return { regiKorekauItem }
}