import { v4 as uuidv4 } from 'uuid';
import { useAtom } from "jotai";
import { korekauAtom, korekauItemsLocalStorageAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";
import { localstorageLabel_KorekauItems } from "../../../ts/korekau-localstorageLabel";
import { useCheckJSONByteSize } from './useCheckJSONByteSize';

export const useRegiKorekauItem = () => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);
    const [, setLocalstorage] = useAtom(korekauItemsLocalStorageAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    const { checkJSONByteSize } = useCheckJSONByteSize();

    const regiKorekauItem: (korekauItem: korekauItemsType) => void = (korekauItem: korekauItemsType) => {
        const shallowCopyKorekauItems = { ...korekauItem }

        const newKorekauItems: korekauItemsType = {
            ...shallowCopyKorekauItems,
            uuid: uuidv4() // key に渡すための固有の識別子
        }

        if (shallowCopyKorekauItems.itemName.length > 0) {
            setKorekauLists([...korekauLists, newKorekauItems]);
            /* ---------------- localStorage 関連の処理（登録）---------------- */
            checkJSONByteSize(JSON.stringify([...korekauLists, newKorekauItems])); // localStorage のストレージ上限チェック
            setLocalstorage([...korekauLists, newKorekauItems]);
            localStorage.setItem(localstorageLabelKorekauItems, JSON.stringify([...korekauLists, newKorekauItems]));
        }
    }

    return { regiKorekauItem }
}