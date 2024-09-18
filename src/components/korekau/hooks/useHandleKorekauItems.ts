import { ChangeEvent } from "react";
import { korekauItemsType } from "../ts/korekau";

export const useHandleKorekauItems = () => {
    const handleKorekauItems: (targetElm: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, korekauItem: korekauItemsType, setKorekauItem: React.Dispatch<React.SetStateAction<korekauItemsType>>) => void = (
        targetElm: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        korekauItem: korekauItemsType,
        setKorekauItem: React.Dispatch<React.SetStateAction<korekauItemsType>>
    ) => {
        const type: string = targetElm.currentTarget.id;
        let value: string | number | boolean = targetElm.currentTarget.value;

        /* 「個数」項目 */
        if (type === 'itemNumber') {
            if (!Number(value) && value.length > 0) return; // 入力内容が0文字数以上かつ数値以外の場合は早期リターンで処理終了
            else if (parseInt(value) > 99) return; // 入力受付は99まで（99以上は早期リターンで処理終了）
        }

        /* 「すぐ買う」項目かつ input 要素かどうかを判定 */
        if (type === 'itemPriority' && targetElm.currentTarget instanceof HTMLInputElement) {
            value = targetElm.currentTarget.checked; // Bool：true/false
        }

        const newKorekauitem: korekauItemsType = {
            ...korekauItem,
            [type]: value
        }
        setKorekauItem((_prevKorekauitem) => newKorekauitem);
    }

    return { handleKorekauItems }
}