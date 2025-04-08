import { memo } from "react";
import { useAtom } from "jotai";
import { trashDateLocalStorageAtom } from "../../../ts/trash-atom";
import { localstorageLabel_TrashDate } from "../../../ts/trash-localstorageLabel";

export const TrashDateListsAllReset = memo(() => {
    const [, setLocalstorage] = useAtom(trashDateLocalStorageAtom);

    const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

    const handleAllReset: () => void = () => {
        const result: boolean = confirm('設定中のゴミ出し日をリセットしてもよろしいですか？');
        if (result) {
            localStorage.removeItem(localstorageLabelTrashDate);
            setLocalstorage([]);
            alert('設定中のゴミ出し日をリセットしました');
            location.reload();
        }
    }

    return <button type="button" className="w-fit bg-[#cc3226] border border-transparent text-white cursor-pointer px-[1em] mb-[2.5em] rounded leading-[2.75rem] text-[0.875rem] transition duration-[.25s] hover:bg-transparent hover:text-[#cc3226] hover:border-[#cc3226]" onClick={handleAllReset}>設定中のゴミ出し日をリセット</button>
});