import { todoItemType } from "../ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom, todoMemoLocalStorageAtom } from "../../../../ts/calendar-atom";
import { localstorageLabelName } from "../../../../ts/calendar-localstorageLabel";

export const useRegiTodoItem = () => {
    const [, setLocalstorage] = useAtom(todoMemoLocalStorageAtom); // 更新関数のみ使用
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    const localstorageLabel = localstorageLabelName;

    /* ToDo の登録 */
    const regiTodoItem: (todoID: string, todoContent: string, startTime: string, finishTime: string) => void = (
        todoID: string,
        todoContent: string,
        startTime: string,
        finishTime: string,
    ) => {
        const newTodoList: todoItemType = {
            todoID: todoID,
            todoContent: todoContent,
            edit: false
        };

        if (startTime.length > 0 || finishTime.length > 0) {
            newTodoList.startTime = startTime;
            newTodoList.finishTime = finishTime;
        }

        if (todoContent.length > 0) {
            setTodoMemo((_prevTodoMemo) => [...todoMemo, newTodoList]);
            /* ---------------- localStorage 関連の処理（登録）---------------- */
            setLocalstorage((_prevLocalStorage) => [...todoMemo, newTodoList]);
            localStorage.setItem(localstorageLabel, JSON.stringify([...todoMemo, newTodoList]));
        }
    }

    return { regiTodoItem }
}