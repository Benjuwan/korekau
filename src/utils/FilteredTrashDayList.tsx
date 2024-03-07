import { memo, useEffect, useState } from "react";
import { trashType } from "../components/trash/ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom } from "../ts/trash-atom";
import { TrashDateDetails } from "../components/trash/utils/TrashDateDetails";

export const FilteredTrashDayList = memo(() => {
    const [trashDateLists] = useAtom(trashDateAtom);
    const [filteredTrashDayLists, setFilteredTrashDayLists] = useState<trashType[]>([]);
    useEffect(() => {
        const theDayofToday: number = new Date().getDay();
        let isSat: boolean = theDayofToday + 1 === 7;

        const filteredTrashDayLists: trashType[] = trashDateLists.filter(trashDateList => {
            if (isSat) {
                if (trashDateList.day === 0) return trashDateList;
            } else {
                if (trashDateList.day === (theDayofToday + 1)) return trashDateList;
            }
        });
        console.log(filteredTrashDayLists);

        setFilteredTrashDayLists((_prevFilteredTrashDayLists) => filteredTrashDayLists);
    }, [trashDateLists]);

    return (
        <>
            {filteredTrashDayLists.length > 0 &&
                filteredTrashDayLists.map((filteredTrashDayList, i) => {
                    <div key={i}>
                        明日は
                        <TrashDateDetails trashDateList={filteredTrashDayList} />
                        の日です。
                    </div>
                })
            }
        </>
    );
});