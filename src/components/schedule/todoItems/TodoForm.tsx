import { ChangeEvent, SyntheticEvent, useState } from "react";
import todoStyle from "./css/todoStyle.module.css";
import { useUpdateTodoItem } from "./hooks/useUpdateTodoItem";
import { useRegiTodoItem } from "./hooks/useRegiTodoItem";
import { useViewTodoCtrl } from "./hooks/useViewTodoCtrl";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { todoItemType } from "./ts/todoItemType";

type TodoFormType = {
    todoItem?: todoItemType;
    todoId?: string;
}

export const TodoForm = ({ props }: { props: TodoFormType }) => {
    const { todoItem, todoId } = props;

    const initTodoItems: todoItemType = {
        uuid: todoItem ? todoItem.uuid : '001',
        todoID: todoId ? todoId : todoItem ? todoItem.todoID : '001',
        todoContent: '',
        startTime: '',
        finishTime: '',
        edit: todoItem ? todoItem.edit : false
    }
    const [todoItems, setTodoItems] = useState<todoItemType>(initTodoItems);

    const { updateTodoItem } = useUpdateTodoItem();
    const { regiTodoItem } = useRegiTodoItem();
    const { viewTodoCtrl } = useViewTodoCtrl();
    const { scrollTop } = useScrollTop();

    const handleTodoItems: (targetElm: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void = (targetElm: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const type: string = targetElm.currentTarget.id;
        const value: string | number | boolean = targetElm.currentTarget.value;

        const newTodoitems: todoItemType = {
            ...todoItems,
            [type]: value
        }
        setTodoItems((_prevTodoItems) => newTodoitems);
    }

    const handleOpenClosedBtnClicked: (ctrlHandlerElm: HTMLButtonElement | SyntheticEvent<HTMLFormElement>) => void = (ctrlHandlerElm: HTMLButtonElement | SyntheticEvent<HTMLFormElement>) => {
        viewTodoCtrl(ctrlHandlerElm);
        scrollTop();
    }

    const resetStates: () => void = () => {
        setTodoItems((_prevTodoItems) => initTodoItems);
        setTimeout(() => scrollTop()); // buttonのクリックイベントでスクロールトップしないので回避策として疑似的な遅延処理
    }

    return (
        <form className={todoStyle.form} onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            {
                !todoItems.edit ?
                    (
                        regiTodoItem(todoItems),
                        handleOpenClosedBtnClicked(formElm)
                    ) :
                    updateTodoItem(todoItems)
            }
            resetStates();
        }}>
            <label>
                <input type="text" value={todoItems.todoContent} id="todoContent" onInput={(e: ChangeEvent<HTMLInputElement>) => handleTodoItems(e)} />
            </label>
            <div className={todoStyle.timeSchedule}>
                <label className={todoStyle.timeLabel}>開始時刻 <input id="startTime" type="time" value={todoItems.startTime} onChange={(e: ChangeEvent<HTMLInputElement>) => handleTodoItems(e)} /></label>
                <label className={todoStyle.timeLabel}>終了時刻 <input id="finishTime" type="time" value={todoItems.finishTime} onChange={(e: ChangeEvent<HTMLInputElement>) => handleTodoItems(e)} /></label>
            </div>
            <button className={todoStyle.formBtns} id={todoStyle.regiUpdateBtn} type="button" disabled={todoItems.todoContent.length <= 0} onClick={(btnEl: SyntheticEvent<HTMLButtonElement>) => {
                {
                    !todoItems.edit ?
                        (
                            regiTodoItem(todoItems),
                            handleOpenClosedBtnClicked(btnEl.currentTarget)
                        ) :
                        updateTodoItem(todoItems)
                }
                resetStates();
            }}>{!todoItems.edit ? '登録' : '再登録'}</button>
        </form>
    );
}