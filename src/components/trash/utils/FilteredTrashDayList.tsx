import { memo, useMemo } from "react";
import { trashType } from "../ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom } from "../../../ts/trash-atom";
import { localstorageLabel_TrashDate } from "../../../ts/trash-localstorageLabel";
import { TrashDateDetails } from "./TrashDateDetails";

export const FilteredTrashDayList = memo(() => {
    const [trashDateLists] = useAtom(trashDateAtom);

    const getLoaclStorageTrashData: trashType[] | undefined = useMemo(() => {
        const localstorageLabelTrashDate: string = localstorageLabel_TrashDate;

        /* localStorage にデータがあればその内容を子コンポーネント（KorekauItems）に渡す */
        const getLocalStorageItems: string | null = localStorage.getItem(localstorageLabelTrashDate);
        if (getLocalStorageItems !== null) {
            const SaveLocalStorageDateItems: trashType[] = JSON.parse(getLocalStorageItems);
            return SaveLocalStorageDateItems;
        }

        return undefined;
    }, []);

    const filteredTrashDayLists: trashType[] = useMemo(() => {
        const targetTrashDateLists: trashType[] = trashDateLists.length > 0 ? [...trashDateLists] : getLoaclStorageTrashData ?? [];

        const theDayofToday: number = new Date().getDay();
        const isSat: boolean = theDayofToday + 1 === 7;

        const filteredLists: trashType[] = [...targetTrashDateLists].filter(trashDateList => {
            if (isSat) {
                /* TrashForm.tsx の handleTrashData メソッドで（オブジェクト： newTrashData として登録する）value が強制的に string となるので強制的に数値型に変換して処理を進める */
                if (Number(trashDateList.day) === 0) return trashDateList;
            } else {
                if (Number(trashDateList.day) === (theDayofToday + 1)) return trashDateList;
            }
        });

        return filteredLists;
    }, [getLoaclStorageTrashData, trashDateLists]);


    return (
        <div className="w-[clamp(20rem,100%,60rem)] px-[1em] mt-0 mx-auto mb-[2.5em]">
            {filteredTrashDayLists.length > 0 &&
                <div className="wrapper p-[1em] bg-white shadow-[0_0_8px_rgba(160,160,160,.5)_inset] rounded">
                    <p className="leading-none text-[1rem] mb-[.5em]"><span className="material-symbols-outlined align-middle scale-[.95] mr-[.5em]">error</span>明日は以下のゴミ出しがあります。</p>
                    {filteredTrashDayLists.map(filteredTrashDayList => (
                        <div key={filteredTrashDayList.uuid}>
                            <TrashDateDetails trashDateList={filteredTrashDayList} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
});
