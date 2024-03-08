import { todoItemType } from "../ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom, todoMemoLocalStorageAtom } from "../../../../ts/calendar-atom";
import { localstorageLabelName } from "../../../../ts/calendar-localstorageLabel";

export const useDeleteTodoItem = () => {
    const [, setLocalstorage] = useAtom(todoMemoLocalStorageAtom); // 更新関数のみ使用
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);
    
    const localstorageLabel = localstorageLabelName;
    
    const deleteTodoItem: (index: number) => void = (index: number) => {
        const shallowCopy: todoItemType[] = [...todoMemo];
        shallowCopy.splice(index, 1);
        setTodoMemo((_prevTodoList) => shallowCopy);
        /* ---------------- localStorage 関連の処理（更新）---------------- */
        if (todoMemo.length <= 1) {
            localStorage.removeItem(localstorageLabel);
            setLocalstorage((_prevLocalstorage) => []);
            return;
        }

        setLocalstorage((_prevLocalStorage) => shallowCopy);
        localStorage.setItem(localstorageLabel, JSON.stringify([...shallowCopy]));
    }

    return {deleteTodoItem}
}