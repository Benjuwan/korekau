import { FC, SyntheticEvent } from "react";
import todoStyle from "./css/todoStyle.module.css";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "../../../ts/calendar-atom";
import { TodoForm } from "./TodoForm";
import { useDeleteTodoItem } from "./hooks/useDeleteTodoItem";
import { useCloseModalWindow } from "./hooks/useCloseModalWindow";
import { useScrollTop } from "../../../hooks/useScrollTop";

type TodoItemsType = {
    todoItem: todoItemType;
    todoID: string;
    index: number;
}

export const TodoItems: FC<TodoItemsType> = (props) => {
    const { todoItem, todoID, index } = props;

    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    const { deleteTodoItem } = useDeleteTodoItem();
    const { closeModalWindow } = useCloseModalWindow();
    const { scrollTop } = useScrollTop();
    const handleCloseModalWindowBtnClicked = (btnEl: SyntheticEvent<HTMLButtonElement>) => {
        btnEl.stopPropagation(); // 親要素のクリックイベント（OnViewModalWindow）発生を防止
        closeModalWindow(btnEl.currentTarget);
        scrollTop();
    }

    const changeMode: (todiItem: todoItemType, index: number, editMode: boolean) => void = (todiItem: todoItemType, index: number, editMode: boolean) => {
        let editState: boolean | null = null;
        if (editMode === false) editState = true;
        else editState = false;

        const updateTodoList: todoItemType = {
            todoID: todoID,
            todoContent: todiItem.todoContent,
            edit: editState
        }

        if (todiItem.startTime || todiItem.finishTime) {
            updateTodoList.startTime = todiItem.startTime;
            updateTodoList.finishTime = todiItem.finishTime;
        }

        const shallowCopy: todoItemType[] = [...todoMemo];
        shallowCopy.splice(index, 1, updateTodoList); // splice（切取＆置換）した結果ではなく「処理結果の残り分（shallowCopy）を更新関数に渡す」ので「変数への代入」を行わず、shallowCopy を以下の setter 関数に渡している。
        setTodoMemo((_prevTodoList) => shallowCopy);
    }

    return (
        <div className={todoStyle.modalWindow}>
            <div className={todoStyle.modalWindowChild}>
                {todoItem.edit === true ?
                    <>
                        <div className={todoStyle.editTargetContent}>
                            <p>--- 編集前 ---</p>
                            <p>ToDo：{todoItem.todoContent}</p>
                            {todoItem.startTime && <p>開始時刻：{todoItem.startTime}</p>}
                            {todoItem.finishTime && <p>終了時刻：{todoItem.finishTime}</p>}
                        </div>
                        <TodoForm
                            todoID={todoID}
                            index={index}
                            edit={todoItem.edit}
                        />
                        <div className={todoStyle.editerIntoCtrlBtns}>
                            <button id={todoStyle["deleteBtn"]} className={todoStyle.formBtns} type="button" onClick={(deleteBtn: SyntheticEvent<HTMLButtonElement>) => {
                                handleCloseModalWindowBtnClicked(deleteBtn);
                                deleteTodoItem(index);
                            }}>削除</button>
                            <button className={`${todoStyle.formBtns} ${todoStyle.editBtn}`} type="button" onClick={() => {
                                changeMode(todoItem, index, todoItem.edit);
                            }}>戻る</button>
                        </div>
                    </> :
                    <div className={todoStyle.editFalseMode}>
                        <div className={todoStyle.editTargetContent}>
                            <p>--- 現在の予定内容 ---</p>
                            <p>ToDo：{todoItem.todoContent}</p>
                            {todoItem.startTime && <p>開始時刻：{todoItem.startTime}</p>}
                            {todoItem.finishTime && <p>終了時刻：{todoItem.finishTime}</p>}
                        </div>
                        <button className={`${todoStyle.formBtns} ${todoStyle.editBtn}`} type="button" onClick={() => {
                            changeMode(todoItem, index, todoItem.edit);
                        }}>編集</button>
                    </div>
                }
            </div>
            <button id={todoStyle["closeBtn"]} type="button" className={todoStyle.formBtns} onClick={(closeBtnEl: SyntheticEvent<HTMLButtonElement>) => handleCloseModalWindowBtnClicked(closeBtnEl)}>詳細画面を閉じる</button>
        </div>
    );
}