import { memo, useEffect, useMemo } from "react";
import todoStyle from "../todoItems/css/todoStyle.module.css";
import calendarStyle from "./css/calendarStyle.module.css";
import { useAtom } from "jotai";
import { todoMemoAtom } from "../../../ts/calendar-atom";
import { calendarItemType } from "./ts/calendarItemType";
import { todoItemType } from "../todoItems/ts/todoItemType";
import { localstorageLabelName } from "../../../ts/calendar-localstorageLabel";
import { TodoForm } from "../todoItems/TodoForm";
import { TodoList } from "../todoItems/TodoList";
import { TodoCtrlClosedBtn } from "../todoItems/TodoCtrlClosedBtn";
import { TodoCtrlOpenBtn } from "../todoItems/TodoCtrlOpenBtn";

type todaySignal = {
    thisYear: number;
    thisMonth: number;
    today: number;
}

export const DaysList = memo(({ days }: { days: calendarItemType[] }) => {
    const today: todaySignal = useMemo(() => {
        return {
            thisYear: new Date().getFullYear(),
            thisMonth: new Date().getMonth() + 1,
            today: new Date().getDate()
        }
    }, []);

    const [, setTodoMemo] = useAtom(todoMemoAtom);

    const localstorageLabel = localstorageLabelName;

    useEffect(() => {
        const getLocalStorageItems: string | null = localStorage.getItem(localstorageLabel);
        if (getLocalStorageItems !== null) {
            const SaveLocalStorageDateItems: todoItemType[] = JSON.parse(getLocalStorageItems);
            setTodoMemo([...SaveLocalStorageDateItems]);
        } else {
            setTodoMemo([]); // 前月や次月に移動するたびに ToDo メモを初期化
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {days.map(day => (
                // カスタムデータ属性の指定は low-case でないと React から怒られる
                <li key={`${day.year}/${day.month}/${day.day}`} data-daydate={day.dayDateNum} className={
                    (
                        today.thisYear === day.year &&
                        today.thisMonth === day.month &&
                        today.today === day.day
                    ) ?
                        `${calendarStyle.todaySignal} ${calendarStyle.calendarLists}` :
                        `${calendarStyle.calendarLists}`
                }>
                    <p>
                        {day.signalPrevNextMonth && <span>{day.month}/</span>}{day.day}
                    </p>
                    {day.signalPrevNextMonth ? null :
                        <div className={`${todoStyle.todoView}`}>
                            <TodoCtrlOpenBtn />
                            <div className={`${todoStyle.todoCtrlElm}`}>
                                <TodoCtrlClosedBtn />
                                <p className={todoStyle.today}>{day.month}/{day.day}（{day.dayDate}）</p>
                                <TodoForm props={{
                                    todoId: `${day.year}/${day.month}/${day.day}`
                                }} />
                            </div>
                            <TodoList todoID={`${day.year}/${day.month}/${day.day}`} />
                        </div>
                    }
                </li>
            ))}
        </>
    );
});