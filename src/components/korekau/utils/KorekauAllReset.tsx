import { memo } from "react";
import { useAtom } from "jotai";
import { korekauItemsLocalStorageAtom } from "../../../ts/korekau-atom";
import { localstorageLabel_KorekauItems } from "../../../ts/korekau-localstorageLabel";

export const KorekauAllReset = memo(() => {
    const [, setLocalstorage] = useAtom(korekauItemsLocalStorageAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    const handleAllReset: () => void = () => {
        const result: boolean = confirm('リストを全削除してもよろしいですか？');
        if (result) {
            localStorage.removeItem(localstorageLabelKorekauItems);
            setLocalstorage([]);
            alert('リストを全削除しました');
            location.reload();
        }
    }

    return <button type="button" className="w-fit bg-[#cc3226] border border-transparent text-white cursor-pointer px-[1em] mb-[2.5em] rounded leading-11 text-[0.875rem] transition duration-[.25s] hover:bg-transparent hover:text-[#cc3226] hover:border-[#cc3226]" onClick={handleAllReset}>リストを全削除</button>
});