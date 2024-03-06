import todoStyle from "../css/todoStyle.module.css";

export const useViewTodoCtrl = () => {
    const viewTodoCtrl: (btnElm: HTMLButtonElement) => void = (btnElm: HTMLButtonElement) => {
        const parentTodoViewElm: HTMLDivElement | null = btnElm.closest(`.${todoStyle.todoView}`);
        if (parentTodoViewElm?.classList.contains(todoStyle.OnView)) {
            parentTodoViewElm.classList.remove(todoStyle.OnView);
            return;
        }
        parentTodoViewElm?.classList.add(todoStyle.OnView);
    }

    return { viewTodoCtrl }
}