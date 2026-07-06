import { memo, useState } from "react";
import { CompareBased } from "../components/compareItems/CompareBased";
import { Introduction } from "../components/Introduction";
import { KorekauBased } from "../components/korekau/KorekauBased";
import { Calendar } from "../components/schedule/calendar/Calendar";
import { TrashBased } from "../components/trash/TrashBased";

type LabelName = typeof labelNames[number];
type ValueName = typeof valueNames[number];

type NavListType = {
    labelName: LabelName;
    valueName: ValueName;
};

// `as const`した（リテラル型として固めた）配列要素が処理対象の場合、
// 配列はインデックスが number 型なので、[number] で「すべての要素の型」を展開できる
const labelNames = [
    'コレカウとは？',
    '買うものリスト',
    '商品価格の比較',
    'カレンダー',
    'ゴミ出し日',
] as const;

const valueNames = [
    'introduction',
    'KorekauBased',
    'CompareBased',
    'Calendar',
    'TrashBased',
] as const;

export const ContentViewer = memo(() => {
    const [currViewContentLabelName, setViewContentLabelName] = useState<ValueName>('KorekauBased');
    const handleViewContentLabelName = (selectedValueName: ValueName): void => {
        setViewContentLabelName(selectedValueName);
    }

    const navListsLabel: NavListType[] = labelNames.map((labelName, i) => ({
        labelName: labelName,
        valueName: valueNames[i],
    }));

    return (
        <>
            <nav className="bg-[rgba(255,255,255,.5)] w-full backdrop-blur-xl shadow-[0_0_4px_rgba(0,0,0,.25)] rounded-[1.5em_0_0_0] overflow-x-scroll fixed bottom-0 left-1/2 -translate-x-1/2 z-1 lg:bg-[#fff6df] lg:max-w-232 lg:shadow-none lg:rounded lg:bottom-auto lg:top-[6em] lg:overflow-x-auto">
                <div className="flex justify-between gap-4 p-4 py-6 w-[130vw] lg:w-auto lg:py-4">
                    {navListsLabel.map((label, i) => (
                        <button
                            key={i}
                            type="button"
                            className={`text-[calc(100vw/44)] block pb-[1.5rm] tracking-[0.25em] py-[0.5em] px-[1em] rounded-full border border-transparent md:text-sm ${currViewContentLabelName === label.valueName ? 'text-white bg-[#1e6cd4]' : 'bg-[#dadada] text-[#767676] hover:cursor-pointer hover:text-[#1e6cd4] hover:border-[#1e6cd4] hover:bg-white active:cursor-pointer active:text-[#1e6cd4] active:border-[#1e6cd4] active:bg-white duration-250'}`}
                            value={label.valueName}
                            onClick={() => handleViewContentLabelName(label.valueName)}
                        >{label.labelName}</button>
                    ))}
                </div>
            </nav>
            <section>
                <div className='mb-[2.5em]'>
                    {currViewContentLabelName === 'introduction' && <Introduction />}
                    {currViewContentLabelName === 'KorekauBased' && <KorekauBased />}
                    {currViewContentLabelName === 'CompareBased' && <CompareBased />}
                    {currViewContentLabelName === 'Calendar' && <Calendar />}
                    {currViewContentLabelName === 'TrashBased' && <TrashBased />}
                </div>
            </section>
        </>
    );
});
