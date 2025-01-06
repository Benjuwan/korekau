import { memo, useMemo } from "react";
import calendarStyle from "./css/calendarStyle.module.css";
import { calendarItemType } from "./ts/calendarItemType";

export const DaydateList = memo(({ days }: { days: calendarItemType[] }) => {
    const theOneWeek = useMemo(() => {
        return days.filter((_, i) => i < 7);
    }, [days]);

    return (
        <>
            {
                theOneWeek.map(day => (
                    <li key={day.day} className={calendarStyle.theOneWeek} data-daydate={day.dayDateNum}>{day.dayDate}</li>
                ))
            }
        </>
    );
});