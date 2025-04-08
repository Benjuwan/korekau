import { memo } from "react";
import { trashType } from "../ts/trash";
import { TrashForm } from "./TrashForm";
import { TrashDateDetails } from "./TrashDateDetails";

type trashDateType = {
    classNameStr: string;
    trashDateList: trashType;
}

export const TrashDateEditer = memo(({ props }: { props: trashDateType }) => {
    const { classNameStr, trashDateList } = props;

    return (
        <div className={classNameStr}>
            <div className="p-[1em] shadow-[0_0_8px_rgba(0,0,0,.25)_inset] bg-white mb-[1em] rounded">
                <TrashDateDetails trashDateList={trashDateList} />の内容を編集
            </div>
            <TrashForm trashDateList={trashDateList} />
        </div>
    );
});