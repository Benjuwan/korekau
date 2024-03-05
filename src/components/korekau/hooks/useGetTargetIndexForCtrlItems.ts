import { useAtom } from "jotai";
import { korekauAtom } from "../../../ts/korekau-atom";

export const useGetTargetIndexForCtrlItems = () => {
    const [korekauLists] = useAtom(korekauAtom);

    const getTargetIndexForCtrlItems: (itemName: string) => number = (itemName: string) => {
        let targetIndex: number = 0;
        [...korekauLists].forEach((korekauList, i) => {
            /* itemName に合致する親元配列（korekauAtom）のインデックスを取得して代入 */
            if (korekauList.itemName === itemName) targetIndex = i;
        });

        return targetIndex;
    }

    return { getTargetIndexForCtrlItems }
}