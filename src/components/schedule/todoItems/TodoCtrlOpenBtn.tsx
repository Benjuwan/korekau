import { SyntheticEvent, memo } from "react";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useViewTodoCtrl } from "./hooks/useViewTodoCtrl";

export const TodoCtrlOpenBtn = memo(() => {
    const { scrollTop } = useScrollTop();
    const { viewTodoCtrl } = useViewTodoCtrl();
    const handleOpenClosedBtnClicked: (btnEl: SyntheticEvent<HTMLButtonElement>) => void = (btnEl: SyntheticEvent<HTMLButtonElement>) => {
        viewTodoCtrl(btnEl.currentTarget);
        scrollTop();
    }

    return (
        <button className="todoCtrlOpen cursor-pointer aspect-square rounded-full w-[2.75rem] h-[2.75rem] grid place-content-center m-auto shadow-[0_0_8px_rgba(0,0,0,.25)_inset] bg-white lg:w-[1.375rem] lg:h-[1.375rem]" onClick={handleOpenClosedBtnClicked}>
            <span className="material-symbols-outlined text-[#767676] align-middle">add_circle</span>
        </button>
    );
});