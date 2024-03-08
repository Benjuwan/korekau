import todoStyle from "../css/todoStyle.module.css";

export const useCloseModalWindow = () => {
    const closeModalWindow: (btnElm: HTMLButtonElement) => void = (btnElm: HTMLButtonElement) => {
        const viewerParentElm: HTMLElement | null = btnElm.closest('li');
        viewerParentElm?.querySelector(`.${todoStyle.modalWindow}`)?.classList.remove(todoStyle.modalWindowOnView);
    }

    return { closeModalWindow }
}