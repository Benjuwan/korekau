import { memo } from "react";
import { trashType } from "../ts/trash";

export const TrashDateDetails = memo(({ trashDateList }: { trashDateList: trashType }) => {
    return (
        <p>
            {/* TrashForm.tsx の handleTrashData メソッドで（オブジェクト： newTrashData として登録する）value が強制的に string となるので強制的に数値型に変換して処理を進める */}
            <span>
                {Number(trashDateList.day) === 1 && '（月）'}
                {Number(trashDateList.day) === 2 && '（火）'}
                {Number(trashDateList.day) === 3 && '（水）'}
                {Number(trashDateList.day) === 4 && '（木）'}
                {Number(trashDateList.day) === 5 && '（金）'}
                {Number(trashDateList.day) === 6 && '（土）'}
                {Number(trashDateList.day) === 0 && '（日）'}
            </span>
            {trashDateList.trashDate}
        </p>
    );
});