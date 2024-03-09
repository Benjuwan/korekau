import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import todoStyle from "./css/todoStyle.module.css";
import { useUpdateTodoItem } from "./hooks/useUpdateTodoItem";
import { useRegiTodoItem } from "./hooks/useRegiTodoItem";
import { useViewTodoCtrl } from "./hooks/useViewTodoCtrl";
import { useScrollTop } from "../../../hooks/useScrollTop";

type todoFormType = {
    todoID: string;
    index?: number;
    edit?: boolean;
}

export const TodoForm: FC<todoFormType> = (props) => {
    /* index には初期値を設定している（一番上の ToDo 編集実現に index が必要なため）*/
    const { todoID, index = 0, edit } = props;

    /* 入力欄の State（ToDo, 開始時刻, 終了時刻）*/
    const [todoContent, setTodoContent] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [finishTime, setFinishTime] = useState<string>('');

    const { updateTodoItem } = useUpdateTodoItem();
    const { regiTodoItem } = useRegiTodoItem();
    const { viewTodoCtrl } = useViewTodoCtrl();
    const { scrollTop } = useScrollTop();
    const handleOpenClosedBtnClicked: (ctrlHandlerElm: HTMLButtonElement | SyntheticEvent<HTMLFormElement>) => void = (ctrlHandlerElm: HTMLButtonElement | SyntheticEvent<HTMLFormElement>) => {
        viewTodoCtrl(ctrlHandlerElm);
        scrollTop();
    }

    const resetStates: () => void = () => {
        setTodoContent((_prevTodoContent) => '');
        setStartTime((_prevStartTime) => '');
        setFinishTime((_prevFinishTime) => '');
    }

    useEffect(() => resetStates(), [todoID]); // 前月や次月に移動するたびに入力欄を初期化

    return (
        <form className={todoStyle.form} onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            {
                !edit ?
                    (
                        regiTodoItem(todoID, todoContent, startTime, finishTime),
                        handleOpenClosedBtnClicked(formElm)
                    ) :
                    updateTodoItem(todoID, todoContent, startTime, finishTime, index)
            }
            resetStates();
        }}>
            <label htmlFor="todoContent">
                <input type="text" value={todoContent} id="todoContent" onInput={(todoTxt: ChangeEvent<HTMLInputElement>) => {
                    setTodoContent((_prevTodoContent) => todoTxt.target.value);
                }} />
            </label>
            <div className={todoStyle.timeSchedule}>
                <label className={todoStyle.timeLabel} htmlFor="startTime">開始時刻 <input type="time" value={startTime} onChange={(timeElm: ChangeEvent<HTMLInputElement>) => setStartTime(timeElm.target.value)} /></label>
                <label className={todoStyle.timeLabel} htmlFor="finishTime">終了時刻 <input type="time" value={finishTime} onChange={(timeElm: ChangeEvent<HTMLInputElement>) => setFinishTime(timeElm.target.value)} /></label>
            </div>
            <button className={todoStyle.formBtns} id={todoStyle.regiUpdateBtn} type="button" disabled={todoContent.length <= 0} onClick={(btnEl: SyntheticEvent<HTMLButtonElement>) => {
                {
                    !edit ?
                        (
                            regiTodoItem(todoID, todoContent, startTime, finishTime),
                            handleOpenClosedBtnClicked(btnEl.currentTarget)
                        ) :
                        updateTodoItem(todoID, todoContent, startTime, finishTime, index)
                }
                resetStates();
            }}>{!edit ? '登録' : '再登録'}</button>
        </form>
    );
}