import { memo, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { trashDateAtom } from "../../../ts/trash-atom";
import { trashType } from "../ts/trash";
import { TrashDateEditer } from "./TrashDateEditer";
import { TrashDateDetails } from "./TrashDateDetails";
import { EditerViewer } from "../../../utils/EditerViewer";

export const TrashDateLists = memo(() => {
    const [trashDateLists] = useAtom(trashDateAtom);

    const [trashDateSortedLists, setTrashDateSortedLists] = useState<trashType[]>([]);

    useEffect(() => {
        const sortedTrashDate: trashType[] = trashDateLists.sort((aheadList, behindList) => {
            return aheadList.day - behindList.day;
        });
        setTrashDateSortedLists(sortedTrashDate);
    }, [trashDateLists]);

    return (
        <ul className="text-[1rem]">
            {trashDateSortedLists.map(trashDateList => (
                <li key={trashDateList.uuid} className="p-[1em] shadow-[0_0_8px_rgba(160,160,160,.5)_inset] rounded flex justify-between items-center gap-[1em] not-last-of-type:mb-[1em]">
                    <TrashDateDetails trashDateList={trashDateList} />
                    <EditerViewer children={
                        <TrashDateEditer props={{
                            classNameStr: 'itemEditer',
                            trashDateList: trashDateList
                        }} />
                    } />
                </li>
            ))}
        </ul>
    );
});