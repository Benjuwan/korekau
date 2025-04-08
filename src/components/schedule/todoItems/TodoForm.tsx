import { ChangeEvent, SyntheticEvent, useState } from "react";
import { todoItemType } from "./ts/todoItemType";
import { useUpdateTodoItem } from "./hooks/useUpdateTodoItem";
import { useRegiTodoItem } from "./hooks/useRegiTodoItem";
import { useViewTodoCtrl } from "./hooks/useViewTodoCtrl";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useCloseModalWindow } from "./hooks/useCloseModalWindow";
import { useHandleFormEntries } from "../../../hooks/useHandleFormEntries";

type TodoFormType = {
    todoItem?: todoItemType;
    todoId?: string;
};

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
    const { closeModalWindow } = useCloseModalWindow();
    const { handleFormEntries } = useHandleFormEntries();

    const handleOpenClosedBtnClicked: (ctrlHandlerElm: HTMLButtonElement | SyntheticEvent<HTMLFormElement>) => void = (ctrlHandlerElm: HTMLButtonElement | SyntheticEvent<HTMLFormElement>) => {
        viewTodoCtrl(ctrlHandlerElm);
        scrollTop();
    }

    const resetStates: () => void = () => {
        setTodoItems(initTodoItems);
        setTimeout(() => scrollTop()); // buttonのクリックイベントでスクロールトップしないので回避策として疑似的な遅延処理
    }

    const handleRegiUpdateAction: (e: SyntheticEvent<HTMLButtonElement>) => void = (e: SyntheticEvent<HTMLButtonElement>) => {
        if (!todoItems.edit) {
            regiTodoItem(todoItems);
            handleOpenClosedBtnClicked(e.currentTarget);
        } else {
            e.stopPropagation(); // 親要素のクリックイベント（OnViewModalWindow）発生を防止
            updateTodoItem(todoItems);
            closeModalWindow();
        }
        resetStates();
    }

    const handleFormSubmit: (e: SyntheticEvent<HTMLFormElement>) => void = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!todoItems.edit) {
            regiTodoItem(todoItems);
            handleOpenClosedBtnClicked(e);
        } else {
            updateTodoItem(todoItems);
        }
        resetStates();
    }

    return (
        <form className="text-[0.875rem] leading-[1.8] w-[56%] mx-auto mb-[1em] flex flex-col"
            onSubmit={handleFormSubmit}>
            <label className="block mb-[1em]">
                <input
                    type="text"
                    value={todoItems.todoContent}
                    id="todoContent"
                    className="text-[1rem] leading-[2] w-full pl-[.25em]"
                    onInput={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)} />
            </label>
            <div className="md:flex md:justify-start md:gap-[1em]">
                <label className="block mb-[1em] text-[clamp(0.625rem,100%, 0.875rem)] block my-[1em] mx-0 md:w-full">開始時刻
                    <input
                        type="time"
                        id="startTime"
                        className="text-[1rem] leading-[2] w-full pl-[.25em] md:w-[70%] md:ml-[.5em]"
                        value={todoItems.startTime}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)} /></label>
                <label className="block mb-[1em] text-[clamp(0.625rem,100%, 0.875rem)] block my-[1em] mx-0 md:w-full">終了時刻
                    <input
                        type="time"
                        id="finishTime"
                        className="text-[1rem] leading-[2] w-full pl-[.25em] md:w-[70%] md:ml-[.5em]"
                        value={todoItems.finishTime}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)} /></label>
            </div>
            <button
                type="button"
                id="regiUpdateBtn"
                className="text-[0.875rem] leading-[1.8] w-full"
                disabled={todoItems.todoContent.length <= 0}
                onClick={handleRegiUpdateAction}>{!todoItems.edit ? '登録' : '再登録'}</button>
        </form>
    );
}