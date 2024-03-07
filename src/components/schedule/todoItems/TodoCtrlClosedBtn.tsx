import { SyntheticEvent, memo } from "react";
import todoStyle from "./css/todoStyle.module.css";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useViewTodoCtrl } from "./hooks/useViewTodoCtrl";

export const TodoCtrlClosedBtn = memo(() => {
    const { scrollTop } = useScrollTop();
    const { viewTodoCtrl } = useViewTodoCtrl();
    const handleOpenClosedBtnClicked: (btnEl: HTMLButtonElement) => void = (btnEl: HTMLButtonElement) => {
        viewTodoCtrl(btnEl);
        scrollTop();
    }

    return (
        <button className={`${todoStyle.closeBtn} todoCtrlClose`} onClick={(btnEl: SyntheticEvent<HTMLButtonElement>) => handleOpenClosedBtnClicked(btnEl.currentTarget)}>
            <span className="material-symbols-outlined">close</span>
        </button>
    );
});