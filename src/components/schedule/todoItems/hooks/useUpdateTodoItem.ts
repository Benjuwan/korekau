import { todoItemType } from "../ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom, todoMemoLocalStorageAtom } from "../../../../ts/calendar-atom";
import { localstorageLabelName } from "../../../../ts/calendar-localstorageLabel";
import { useCheckJSONByteSize } from "../../../korekau/hooks/useCheckJSONByteSize";

export const useUpdateTodoItem = () => {
    const [, setLocalstorage] = useAtom(todoMemoLocalStorageAtom); // 更新関数のみ使用
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    const localstorageLabel = localstorageLabelName;

    const { checkJSONByteSize } = useCheckJSONByteSize();

    /* ToDo の更新 */
    const updateTodoItem: (todoID: string, uuid: string, todoContent: string, startTime: string, finishTime: string) => void = (
        todoID: string,
        uuid: string,
        todoContent: string,
        startTime: string,
        finishTime: string
    ) => {
        const updateTodoList: todoItemType = {
            uuid: uuid,
            todoID: todoID,
            todoContent: todoContent,
            edit: false
        };

        if (startTime.length > 0 || finishTime.length > 0) {
            updateTodoList.startTime = startTime;
            updateTodoList.finishTime = finishTime;
        }

        const exceptRemoveTodoItems: todoItemType[] = [...todoMemo].filter(todoItem => todoItem.uuid !== uuid); // 今回更新（削除）対象の todoItem 以外を返す

        /* ----------------------- 以下（変数：shallowCopy を用いた方法）は map 処理時の index を用いた方法（※React では原則 key={i} は NG（key に index を渡すのは非推奨）なので上記の uuid を用いた方法を採用）----------------------- */
        // const shallowCopy: todoItemType[] = [...todoMemo];
        // shallowCopy.splice(index, 1, updateTodoList); // splice（切取＆置換）した結果ではなく「処理結果の残り分（shallowCopy）を更新関数に渡す」ので「変数への代入」を行わず、shallowCopy を以下の setter 関数に渡している。

        if (todoContent.length > 0) {
            // setTodoMemo((_prevTodoMemo) => shallowCopy);
            setTodoMemo((_prevTodoMemo) => [...exceptRemoveTodoItems, updateTodoList]);
            /* ---------------- localStorage 関連の処理（更新）---------------- */
            checkJSONByteSize(JSON.stringify([...exceptRemoveTodoItems, updateTodoList])); // localStorage のストレージ上限チェック

            // setLocalstorage((_prevLocalStorage) => shallowCopy);
            // localStorage.setItem(localstorageLabel, JSON.stringify([...shallowCopy]));
            setLocalstorage((_prevLocalStorage) => [...exceptRemoveTodoItems, updateTodoList]);
            localStorage.setItem(localstorageLabel, JSON.stringify([...exceptRemoveTodoItems, updateTodoList]));
        }
    }

    return { updateTodoItem }
}