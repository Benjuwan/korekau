import { memo, useState } from "react";
import { useAtom } from "jotai";
import { korekauAtom } from "../ts/korekau-atom";

export const ExportJsonData = memo(() => {
    const [korekauLists] = useAtom(korekauAtom);

    const [link, setLink] = useState<string>('');

    const outputJsonData: () => void = () => {
        const fileData: string = JSON.stringify(korekauLists);
        const blob: Blob = new Blob([fileData], { type: 'application/json' });
        const url: string = URL.createObjectURL(blob);
        setLink(url);
    }

    return (
        <div className="ExportJsonData">
            <p className="block border-l border-l-[.25rem] border-l-[#f0b20e] pl-[.5em] mb-[.5em]">買うものリストの書き出し</p>
            <a className={`block text-[0.875rem] text-center w-full py-[.25em] px-[.5em] no-underline text-white bg-[#f0b20e] border border-transparent rounded disabled:pointer-events-none disabled:bg-[#333] not-disabled:hover:text-[#f0b20e] not-disabled:hover:border-[#f0b20e] not-disabled:hover:bg-white ${korekauLists.length > 0 ? 'abled' : 'disabled'}`} href={link} download={'korekauitems.json'} onClick={outputJsonData}>リストを書き出す</a>
        </div>
    );
});