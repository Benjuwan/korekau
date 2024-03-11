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
        setLink((_prevLink) => url);
    }

    return (
        <div className="ExportJsonData">
            <p className="dataLabel">買うものリストの書き出し</p>
            <a className={korekauLists.length > 0 ? 'abled' : 'disabled'} href={link} download={'korekauitems.json'} onClick={outputJsonData}>リストを書き出す</a>
        </div>
    );
});