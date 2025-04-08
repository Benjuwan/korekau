import { memo } from "react";
import { korekauItemsType } from "../ts/korekau";

export const PartKorekauItemsImg = memo(({ korekauList }: { korekauList: korekauItemsType }) => {
    return (
        <details>
            <summary className="korekauDetailsSummary cursor-pointer text-[0.875rem]"><span className="material-symbols-outlined mr-[.5em] align-middle shadow-[0_0_8px_rgba(0,0,0,.25)_inset] rounded-full p-2 bg-white">mms</span>参照画像</summary>
            <figure className="mt-[.5em] max-w-[30rem]"><img className="m-auto" src={korekauList.itemImg} alt={`${korekauList.itemName}の参照画像`} /></figure>
        </details>
    );
});