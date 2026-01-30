import { SyntheticEvent, memo, useRef, useState } from "react";
import { trashType } from "../ts/trash";
import { useRegiTrashDate } from "../hooks/useRegiTrashDate";
import { useUpdateTrashDate } from "../hooks/useUpdateTrashDate";
import { useDeleteTrashDate } from "../hooks/useDeleteTrashDate";
import { useTargetElsRemoveClass } from "../../../hooks/useTargetElsRemoveClass";
import { useHandleFormEntries } from "../../../hooks/useHandleFormEntries";

export const TrashForm = memo(({ trashDateList }: { trashDateList?: trashType }) => {
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const dayValue: number = selectRef.current !== null ? parseInt(selectRef.current?.value) : 1;

    const initTrashData: trashType = {
        uuid: trashDateList ? trashDateList.uuid : '001',
        day: trashDateList ? trashDateList.day : dayValue,
        trashDate: trashDateList ? trashDateList.trashDate : ''
    }
    const [trashData, setTrashData] = useState<trashType>(initTrashData);

    const { regiTrashDate } = useRegiTrashDate();
    const { updateTrashDate } = useUpdateTrashDate();
    const { deleteTrashDate } = useDeleteTrashDate();
    const { targetElsRemoveClass } = useTargetElsRemoveClass();
    const { handleFormEntries } = useHandleFormEntries();

    const handleFormSubmit: (e: SyntheticEvent<HTMLFormElement>) => void = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (trashDateList) {
            updateTrashDate(trashData);
            targetElsRemoveClass('editerView', 'OnView');
        } else {
            regiTrashDate(trashData);
        }

        setTrashData(initTrashData);
    }

    return (
        <form action="" className="rounded p-[1.5em] shadow-[0_0_8px_rgba(160,160,160,.5)_inset] mt-[.5em] mx-auto mb-[5em] bg-white" onSubmit={handleFormSubmit}>
            <div className="mb-[2em]">
                <label className="leading-loose border-l-4 border-l-[#676767] pl-[.5em] mb-[.5em]">曜日</label>
                <select
                    name="daySelect"
                    id="day"
                    className="text-[1rem] leading-loose w-full rounded border border-[#c6c6c6]"
                    ref={selectRef}
                    onChange={(e: SyntheticEvent<HTMLSelectElement>) => handleFormEntries<trashType>(e, trashData, setTrashData)}
                    defaultValue={trashData.day} // 既存内容がある場合、以前選択した曜日が selected される
                >
                    <option value="1">（月）</option>
                    <option value="2">（火）</option>
                    <option value="3">（水）</option>
                    <option value="4">（木）</option>
                    <option value="5">（金）</option>
                    <option value="6">（土）</option>
                    <option value="0">（日）</option>
                </select>
            </div>
            <div className="mb-[2em]">
                <label className="leading-loose border-l-4 border-l-[#676767] pl-[.5em] mb-[.5em]">出せるゴミの種別・内容</label>
                <input type="text" value={trashData.trashDate} id="trashDate" className="text-[1rem] leading-loose w-full rounded border border-[#c6c6c6] pl-[.5em]" onInput={(e: SyntheticEvent<HTMLInputElement>) => handleFormEntries<trashType>(e, trashData, setTrashData)} placeholder="例：燃えるゴミ" />
            </div>
            <div className={trashDateList ? 'ctrlBtns flex justify-between gap-[5%]' : undefined}>
                <input type="submit" className="text-[1rem] leading-loose rounded border border-[#c6c6c6] pl-[.5em] block w-full text-white bg-[#676767] tracking-[0.5em] transiton duration-[.25s] disabled:text-[#999] disabled:bg-[#393939] not-disabled:hover:cursor-pointer not-disabled:hover:text-[#676767] not-disabled:hover:border-[#676767] not-disabled:hover:bg-white" disabled={trashData.trashDate.length <= 0} value={trashDateList ? '再登録' : '登録'} />
                {trashDateList &&
                    <button type="button" className="editerCloseBtn bg-[#59b835] w-[20%] rounded transition duration-[.25s] hover:text-white" onClick={() => targetElsRemoveClass('editerView', 'OnView')}>戻る</button>
                }
                {trashDateList &&
                    <button type="button" className="deleteBtn w-fit cursor-pointer text-white" onClick={() => deleteTrashDate(trashDateList.uuid)}><span className="material-symbols-outlined align-middle shadow-[ 0_0_8px_rgba(0,0,0,.25)_inset] rounded p-[.25em] bg-[#cc3226]">delete</span></button>
                }
            </div>
        </form>
    );
});