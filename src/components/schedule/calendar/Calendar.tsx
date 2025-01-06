import { SyntheticEvent, useEffect, useState } from "react";
import calendarStyle from "./css/calendarStyle.module.css";
import { calendarItemType } from "./ts/calendarItemType";
import { useAtom } from "jotai";
import { isDesktopViewAtom, todoMemoAtom, todoMemoLocalStorageAtom } from "../../../ts/calendar-atom";
import { localstorageLabelName } from "../../../ts/calendar-localstorageLabel";
import { PrevNextMonthBtns } from "./PrevNextMonthBtns";
import { DaydateList } from "./DaydateList";
import { DaysList } from "./DaysList";
import { useGetMonthDays } from "./hooks/useGetMonthDays";

type todaySignal = {
    thisYear: number;
    thisMonth: number;
    today: number;
}

export const Calendar = () => {
    const { getMonthDays } = useGetMonthDays();

    const [todoMemo] = useAtom(todoMemoAtom);
    const [, setLocalstorage] = useAtom(todoMemoLocalStorageAtom); // 更新関数のみ使用（全てのスケジュールリセット）
    const [, setDesktopView] = useAtom(isDesktopViewAtom);

    const localstorageLabel: string = localstorageLabelName;

    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth() + 1;
    const [ctrlYear, setCtrlYear] = useState<number>(currYear);
    const [ctrlMonth, setCtrlMonth] = useState<number>(currMonth);
    const [days, setDays] = useState<calendarItemType[]>([]);
    const [, setCtrlToday] = useState<todaySignal | null>(null);

    useEffect(() => {
        const today: todaySignal = {
            thisYear: new Date().getFullYear(),
            thisMonth: new Date().getMonth() + 1,
            today: new Date().getDate()
        }
        setCtrlToday((_prevCtrlToday) => today);

        if (window.matchMedia("(min-width: 1025px)").matches) setDesktopView(true);
    }, []);

    const jumpThisMonth: () => void = () => {
        const thisYear: number = new Date().getFullYear();
        const thisMonth: number = new Date().getMonth() + 1;
        setCtrlYear((_prevCtrlYear) => thisYear);
        setCtrlMonth((_prevCtrlMonth) => thisMonth);
        getMonthDays(thisYear, thisMonth, setDays);
        window.scrollTo(0, 0);
    }

    const resetAllSchedule: () => void = () => {
        const result: boolean = confirm('全てのスケジュールを削除してもよろしいですか？');
        if (result) {
            localStorage.removeItem(localstorageLabel);
            setLocalstorage((_prevLocalstorage) => []);
            alert('全てのスケジュールが削除されました');
            location.reload();
        }
    }

    /* カレンダーの部分ではスワイプ機能を停止 */
    const handleSwipeCancel: (calendarElm: SyntheticEvent<HTMLUListElement>) => void = (calendarElm: SyntheticEvent<HTMLUListElement>) => calendarElm.stopPropagation();

    useEffect(() => getMonthDays(ctrlYear, ctrlMonth, setDays), [ctrlMonth]);

    return (
        <section className={calendarStyle.wrapper}>
            <h2>{ctrlYear}年{ctrlMonth}月</h2>
            {todoMemo.length > 0 &&
                <button className={calendarStyle.resetBtn} type="button" onClick={resetAllSchedule}>予定を全削除</button>
            }
            <PrevNextMonthBtns
                className={calendarStyle.btns}
                ctrlYear={ctrlYear}
                setCtrlYear={setCtrlYear}
                ctrlMonth={ctrlMonth}
                setCtrlMonth={setCtrlMonth}
            />
            <button id={calendarStyle["jumpThisMonth"]} type="button" onClick={jumpThisMonth}>今月に移動</button>
            <ul className={calendarStyle.calendar}
                // Reactにおけるイベントハンドラでは、イベントオブジェクト（SyntheticEvent）が自動的に渡されるので以下の書き方でOK （handleSwipeCancel にわざわざ引数を指定しなくても良い）
                onTouchMove={handleSwipeCancel}
            >
                <DaydateList days={days} />
                <DaysList days={days} />
            </ul>
        </section>
    );
}