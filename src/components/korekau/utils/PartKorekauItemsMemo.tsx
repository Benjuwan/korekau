import { memo } from "react";
import { korekauItemsType } from "../ts/korekau";
import { useKorekauMemoView } from "../hooks/useKorekauMemoView";

export const PartKorekauItemsMemo = memo(({ korekauList }: { korekauList: korekauItemsType }) => {
    const { korekauMemoView } = useKorekauMemoView();

    return (
        <div className="korekauMemo my-[.5em] w-full">
            <button type="button" className="text-[0.875rem] text-[#333]" onClick={(btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>) => korekauMemoView(btnEl.currentTarget)}><span className="material-symbols-outlined mr-[.5em] align-middle shadow-[0_0_8px_rgba(0,0,0,.25)_inset] rounded-full p-2 bg-white">chat</span>注釈メモ</button>
            <div className="korekauMemoContenet absolute top-[0] left-[50%] z-[-1] transform-[translate(-50%,5em)] w-full h-fit max-h-[15rem] rounded-[.5rem] overflow-y-scroll p-[1rem] text-white bg-[rgba(80,80,80,.85)] opacity-[0] invisible transition duration-[.25s]">
                <button type="button" className="block mb-[1em] text-[0.875rem] text-[#333]" onClick={(btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>) => korekauMemoView(btnEl.currentTarget)}><span className="material-symbols-outlined mr-[.5em] bg-white rounded-full p-1">close</span></button>
                {korekauList.itemMemo}
            </div>
        </div>
    );
});