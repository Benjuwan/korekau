import todoStyle from "../css/todoStyle.module.css";

export const useCloseModalWindow = () => {
    const closeModalWindow: (btnElm: HTMLButtonElement, ParentElmNameStr: string) => void = (
        btnElm: HTMLButtonElement,
        ParentElmNameStr: string
    ) => {
        const viewerParentElm: HTMLElement | null = btnElm.closest(ParentElmNameStr);
        if(ParentElmNameStr === '.todoView') {
            console.log(ParentElmNameStr, viewerParentElm);
            viewerParentElm?.querySelector(`.${todoStyle.todoView}`)?.classList.remove(`${todoStyle.OnView}`);
        } else {
            viewerParentElm?.querySelector(`.${todoStyle.modalWindow}`)?.classList.remove(`${todoStyle.modalWindowOnView}`);
        }
    }

    return { closeModalWindow }
}