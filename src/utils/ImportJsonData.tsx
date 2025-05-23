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
            const newKorekauItems: korekauItemsType[] = [...korekauLists, ...inputKorekauItemsJsonData];
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