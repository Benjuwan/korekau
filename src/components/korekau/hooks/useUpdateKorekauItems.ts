import { useAtom } from "jotai";
import { korekauAtom, korekauItemsLocalStorageAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";
import { localstorageLabel_KorekauItems } from "../../../ts/korekau-localstorageLabel";
import { useCheckJSONByteSize } from "./useCheckJSONByteSize";

export const useUpdateKorekauItems = () => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);
    const [, setLocalstorage] = useAtom(korekauItemsLocalStorageAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    const { checkJSONByteSize } = useCheckJSONByteSize();

    const updateKorekauItems: (korekauItem: korekauItemsType) => void = (korekauItem: korekauItemsType) => {
        const updateKorekauItem: korekauItemsType = { ...korekauItem }

        const exceptRemoveKorekauItem: korekauItemsType[] = [...korekauLists].filter(todoItem => todoItem.uuid !== updateKorekauItem.uuid); // 今回更新（削除）対象の korekauItem 以外を返す

        if (updateKorekauItem.itemName.length > 0) {
            setKorekauLists([...exceptRemoveKorekauItem, updateKorekauItem]);
            /* ---------------- localStorage 関連の処理（更新）---------------- */
            checkJSONByteSize(JSON.stringify([...exceptRemoveKorekauItem, updateKorekauItem])); // localStorage のストレージ上限チェック
            setLocalstorage([...exceptRemoveKorekauItem, updateKorekauItem]);
            localStorage.setItem(localstorageLabelKorekauItems, JSON.stringify([...exceptRemoveKorekauItem, updateKorekauItem]));
        }
    }

    return { updateKorekauItems }
}