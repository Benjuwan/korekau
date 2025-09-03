import { ChangeEvent, memo } from "react";
import { korekauItemsType } from "../components/korekau/ts/korekau";
import { useAtom } from "jotai";
import { korekauAtom, korekauItemsLocalStorageAtom } from "../ts/korekau-atom";
import { localstorageLabel_KorekauItems } from "../ts/korekau-localstorageLabel";
import { useCheckJSONByteSize } from "../components/korekau/hooks/useCheckJSONByteSize";

export const ImportJsonData = memo(() => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);
    const [, setLocalstorage] = useAtom(korekauItemsLocalStorageAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    const fileAccept: string = 'application/json';

    const { checkJSONByteSize } = useCheckJSONByteSize();

    const inputJsonData = (fileElm: HTMLInputElement) => {
        if (fileElm.files && fileElm.files[0].name !== 'korekauitems.json') return; // 所定のファイル名でない場合は早期終了 

        const files = fileElm.files as FileList;
        const file = files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const inputKorekauItemsJsonData: korekauItemsType[] = JSON.parse(reader.result as string);

            // 既存のリストと読み込んだjsonリストとを比較して重複している uuid を抽出
            const duplicatedLists_uuid: string[] = [...inputKorekauItemsJsonData].map(inputItem => {
                for (const item of korekauLists) {
                    if (inputItem.uuid.includes(item.uuid)) {
                        return inputItem.uuid;
                    }
                }
            }).filter((inputItem): inputItem is string => typeof inputItem !== 'undefined');

            // duplicatedLists_uuid の予備用：より厳密な条件で重複 uuid を抽出
            const duplicatedLists_sub: string[] = [...inputKorekauItemsJsonData].map(inputItem => {
                for (const item of korekauLists) {
                    const isSame_Name = inputItem.itemName.includes(item.itemName);
                    const isSame_Number = inputItem.itemNumber.toString().includes(item.itemNumber.toString());
                    const isSame_Category = inputItem.itemCategory.includes(item.itemCategory);
                    const isSame_Img = inputItem.itemImg?.includes(item.itemImg ?? 'undefined or null');
                    const isSame_Memo = inputItem.itemMemo?.includes(item.itemMemo ?? 'undefined or null');

                    if (isSame_Name && isSame_Number && isSame_Category && isSame_Img && isSame_Memo) {
                        return inputItem.uuid;
                    }
                }
            }).filter((inputItem): inputItem is string => typeof inputItem !== 'undefined');

            const duplicatedLists: string[] = duplicatedLists_sub.length > 0 ? duplicatedLists_sub : duplicatedLists_uuid;

            const exceptDuplicatedKorekauLists: korekauItemsType[] = [...inputKorekauItemsJsonData].filter(inputItem => !duplicatedLists.includes(inputItem.uuid));

            const newKorekauItems: korekauItemsType[] = [...korekauLists, ...exceptDuplicatedKorekauLists];
            setKorekauLists(newKorekauItems);
            /* ---------------- localStorage 関連の処理（登録）---------------- */
            checkJSONByteSize(JSON.stringify(newKorekauItems)); // localStorage のストレージ上限チェック
            setLocalstorage(newKorekauItems);
            localStorage.setItem(localstorageLabelKorekauItems, JSON.stringify(newKorekauItems));
            location.reload();
        };

        reader.readAsText(file);
    }

    return (
        <label htmlFor="ImportJsonDate">
            <span className="block border-l-[.25rem] border-l-[#f0b20e] pl-[.5em] mb-[.5em]">買うものリストの読み込み</span>
            <input
                type="file"
                accept={fileAccept}
                className="text-[0.875rem] file:cursor-pointer file:mr-4 file:rounded-sm file:border file:border-transparent file:bg-[#eaeaea] file:px-4 file:py-1 file:text-[#333] hover:file:border-[#333]"
                onChange={(fileElm: ChangeEvent<HTMLInputElement>) => inputJsonData(fileElm.currentTarget)}
                id="ImportJsonDate"
            />
        </label>
    );
});