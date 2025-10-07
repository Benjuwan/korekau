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

        // 置換対象アイテムのインデックス番号を取得
        const targetIndex: number[] = [...korekauLists].map((korekauItem, i) => {
            if (korekauItem.uuid === updateKorekauItem.uuid) {
                return i;
            }
        }).filter((korekauItem): korekauItem is number => typeof korekauItem !== 'undefined');

        // `with`メソッドを用いて非破壊的に更新要素の置換処理を実施（置換対象アイテムのインデックス位置で置換）
        const updateKorekauLists: korekauItemsType[] = korekauLists.with(targetIndex[0], updateKorekauItem);

        if (updateKorekauItem.itemName.length > 0) {
            setKorekauLists(updateKorekauLists);
            /* ---------------- localStorage 関連の処理（更新）---------------- */
            checkJSONByteSize(JSON.stringify(updateKorekauLists)); // localStorage のストレージ上限チェック
            setLocalstorage(updateKorekauLists);
            localStorage.setItem(localstorageLabelKorekauItems, JSON.stringify(updateKorekauLists));
        }
    }

    return { updateKorekauItems }
}