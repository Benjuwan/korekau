import { FC } from "react";
import { useAtom } from "jotai";
import { todoMemoLocalStorageAtom } from "../../../ts/calendar-atom";
import { localstorageLabelName } from "../../../ts/calendar-localstorageLabel";
import { useScrollTop } from "../../../hooks/useScrollTop";

type btnsPropsType = {
    className: string;
    ctrlMonth: number;
    setCtrlYear: React.Dispatch<React.SetStateAction<number>>;
    ctrlYear: number;
    setCtrlMonth: React.Dispatch<React.SetStateAction<number>>;
}

const btnStyle: object = {
    'padding': '.5em 1em'
}

const btnIconStyle: object = {
    'verticalAlign': 'middle'
}

export const PrevNextMonthBtns: FC<btnsPropsType> = (props) => {
    const { className, ctrlYear, setCtrlYear, ctrlMonth, setCtrlMonth } = props;

    const [localstorageData] = useAtom(todoMemoLocalStorageAtom); // 変数のみ使用（カレンダー移動時の登録・更新作業）

    const localstorageLabel: string = localstorageLabelName;

    const { scrollTop } = useScrollTop();

    const nextCalendarView = () => {
        if (ctrlMonth === 12) {
            setCtrlYear(ctrlYear + 1);
            setCtrlMonth(1);
        } else {
            setCtrlMonth(ctrlMonth + 1);
        }
        /* ---------------- localStorage 関連の処理（登録）---------------- */
        localStorage.setItem(localstorageLabel, JSON.stringify([...localstorageData]));

        scrollTop();
    }

    const prevCalendarView = () => {
        if (ctrlMonth === 1) {
            setCtrlYear(ctrlYear - 1);
            setCtrlMonth(12);
        } else {
            setCtrlMonth(ctrlMonth - 1);
        }
        /* ---------------- localStorage 関連の処理（登録）---------------- */
        localStorage.setItem(localstorageLabel, JSON.stringify([...localstorageData]));

        scrollTop();
    }

    return (
        <div className={className}>
            <button type="button" style={btnStyle} onClick={prevCalendarView}><span className="material-symbols-outlined" style={btnIconStyle}>
                navigate_before
            </span></button>
            <button type="button" style={btnStyle} onClick={nextCalendarView}><span className="material-symbols-outlined" style={btnIconStyle}>
                navigate_next
            </span></button>
        </div>
    );
}