import { SyntheticEvent } from "react";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "../../../ts/calendar-atom";
import { TodoForm } from "./TodoForm";
import { useDeleteTodoItem } from "./hooks/useDeleteTodoItem";
import { useCloseModalWindow } from "./hooks/useCloseModalWindow";
import { useScrollTop } from "../../../hooks/useScrollTop";

export const TodoItems = ({ todoItem }: { todoItem: todoItemType }) => {
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    const { deleteTodoItem } = useDeleteTodoItem();
    const { closeModalWindow } = useCloseModalWindow();
    const { scrollTop } = useScrollTop();
    const handleCloseModalWindowBtnClicked: (btnEl: SyntheticEvent<HTMLButtonElement>) => void = (btnEl: SyntheticEvent<HTMLButtonElement>) => {
        btnEl.stopPropagation(); // 親要素のクリックイベント（OnViewModalWindow）発生を防止
        closeModalWindow();
        scrollTop();
    }

    const changeMode: (todoItem: todoItemType) => void = (todoItem: todoItemType) => {
        let editState: boolean | null = null;
        if (todoItem.edit === false) editState = true;
        else editState = false;

        const updateTodoList: todoItemType = {
            ...todoItem,
            edit: editState
        }

        if (todoItem.startTime || todoItem.finishTime) {
            updateTodoList.startTime = todoItem.startTime;
            updateTodoList.finishTime = todoItem.finishTime;
        }

        const exceptUpdateTodoMemos: todoItemType[] = [...todoMemo].filter(todoMemoItem => todoMemoItem.uuid !== todoItem.uuid);

        setTodoMemo([...exceptUpdateTodoMemos, updateTodoList]);
    }

    return (
        .modalWindow {
            position: fixed;
            width: 100vw;
            height: 100%;
            padding: 2.5em 1em 1em;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 255, 255, .5);
            -webkit-backdrop-filter: blur(8px);
            backdrop-filter: blur(8px);
            opacity: 0;
            visibility: hidden;
            transition: opacity .25s, visibility .25s;
            overflow-y: auto;
            overscroll-behavior: contain;

            & .modalWindowChild {
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
                gap: 1em;
                max-width: 560px;
                margin: auto;
                background-color: #fff;
                box-shadow: 0 0 4px rgba(0, 0, 0, .5) inset;
                border-radius: 4px;
                padding: 1em;

                & div.editTargetContent {
                    text-align: left;
                }

                & .editerIntoCtrlBtns {
                    display: flex;
                    gap: 1em;
                    width: clamp(280px, calc(100vw/2), 320px);
                    margin: 2.5em 0 1em;

                    & button {
                        width: 50%;
                    }
                }
            }

            & .modalWindowChild_editabel {
                & div.editTargetContent {
                    margin-bottom: 4em;
                }
            }
        <div className={todoStyle.modalWindow}>
            <div className={todoStyle.modalWindowChild}>
                {todoItem.edit ?
                    <>
                    editTargetContent {
            & span {
                font-size: clamp(10px, calc(100vw/150), 12px);
                display: block;
            }
        }
                        <div className={todoStyle.editTargetContent}>
                            <p>--- 編集前 ---</p>
                            <p>ToDo：{todoItem.todoContent}</p>
                            {todoItem.startTime && <p>開始時刻：{todoItem.startTime}</p>}
                            {todoItem.finishTime && <p>終了時刻：{todoItem.finishTime}</p>}
                        </div>
                        <TodoForm props={{
                            todoItem: todoItem
                        }} />
                        <div className={todoStyle.editerIntoCtrlBtns}>
                            <button id="deleteBtn" className="cursor-pointer aspect-square rounded-full w-[2.75rem] h-[2.75rem] grid place-content-center m-auto font-bold rounded-full tracking-[.25em] bg-[#cc3226]" type="button" onClick={(deleteBtn: SyntheticEvent<HTMLButtonElement>) => {
                                handleCloseModalWindowBtnClicked(deleteBtn);
                                deleteTodoItem(todoItem.uuid);
                            }}>削除</button>
                            <button className="cursor-pointer aspect-square rounded-full w-[2.75rem] h-[2.75rem] grid place-content-center m-auto font-bold rounded-full tracking-[.25em] bg-[#59b835]" type="button" onClick={() => changeMode(todoItem)}>戻る</button>
                        </div>
                    </> :
                    .editFalseMode {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 1em;
            
                        & .editBtn {
                            width: clamp(80px, calc(100vw/2), 160px);
                            margin: auto;
                        }
                    }
                    <div className={todoStyle.editFalseMode}>
                        <div className={todoStyle.editTargetContent}>
                            <p>--- 現在の予定内容 ---</p>
                            <p>ToDo：{todoItem.todoContent}</p>
                            {todoItem.startTime && <p>開始時刻：{todoItem.startTime}</p>}
                            {todoItem.finishTime && <p>終了時刻：{todoItem.finishTime}</p>}
                        </div>
                        <button className="cursor-pointer aspect-square rounded-full w-[2.75rem] h-[2.75rem] grid place-content-center m-auto font-bold rounded-full tracking-[.25em] bg-[#59b835]" type="button" onClick={() => changeMode(todoItem)}>編集</button>
                    </div>
                }
            </div>
            <button id="closeBtn" className="cursor-pointer aspect-square rounded-full w-[2.75rem] h-[2.75rem] grid place-content-center m-auto font-bold rounded-full tracking-[.25em] mt-[1em] text-[#333] bg-[#f0b20e]" type="button" onClick={(closeBtnEl: SyntheticEvent<HTMLButtonElement>) => handleCloseModalWindowBtnClicked(closeBtnEl)}>詳細画面を閉じる</button>
        </div>
    );
}