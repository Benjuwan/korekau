import { useAtom } from "jotai";
import { korekauAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";

export const useGetTargetIndexForCtrlItems = () => {
    const [korekauLists] = useAtom(korekauAtom);

    const getTargetIndexForCtrlItems: (korekauItem: korekauItemsType) => number = (korekauItem: korekauItemsType) => {
        let targetIndex: number = 0;
        [...korekauLists].forEach((korekauList, i) => {
            /* uuid が合致する親元配列（korekauAtom）のインデックスを取得して代入 */
            if (korekauList.uuid === korekauItem.uuid) {
                targetIndex = i;
            }
        });

        return targetIndex;
    }

    return { getTargetIndexForCtrlItems }
}