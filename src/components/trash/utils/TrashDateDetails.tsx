import { memo } from "react";
import { trashType } from "../ts/trash";

export const TrashDateDetails = memo(({ trashDateList }: { trashDateList: trashType }) => {
    
    return (
        <p>
            <span>
                {trashDateList.day === 1 && '（月）'}
                {trashDateList.day === 2 && '（火）'}
                {trashDateList.day === 3 && '（水）'}
                {trashDateList.day === 4 && '（木）'}
                {trashDateList.day === 5 && '（金）'}
                {trashDateList.day === 6 && '（土）'}
                {trashDateList.day === 0 && '（日）'}
            </span>
            {trashDateList.trashDate}
        </p>
    );
});