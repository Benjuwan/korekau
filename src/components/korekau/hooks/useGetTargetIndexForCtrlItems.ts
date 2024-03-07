import { useAtom } from "jotai";
import { korekauAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";

export const useGetTargetIndexForCtrlItems = () => {
    const [korekauLists] = useAtom(korekauAtom);

    const getTargetIndexForCtrlItems: (korekauItem: korekauItemsType) => number = (korekauItem: korekauItemsType) => {
        let targetIndex: number = 0;
        [...korekauLists].forEach((korekauList, i) => {
            /* itemCategory（カテゴリー）と itemName（名前）に合致する親元配列（korekauAtom）のインデックスを取得して代入 */
            if (
                korekauList.itemCategory === korekauItem.itemCategory &&
                korekauList.itemName === korekauItem.itemName
            ) {
                targetIndex = i;
            }
        });

        return targetIndex;
    }

    return { getTargetIndexForCtrlItems }
}