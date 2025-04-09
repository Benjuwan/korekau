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
        <button className="todoCtrlOpen cursor-pointer aspect-square rounded-full w-[0.625rem] h-[0.625rem] grid place-content-center my-[.5em] mx-auto shadow-[0_0_8px_rgba(0,0,0,.25)_inset] bg-white lg:w-[1.25em] lg:h-[1.25em]" onClick={handleOpenClosedBtnClicked}>
            <span className="material-symbols-outlined text-[#767676] align-middle">add_circle</span>
        </button>
    );
});