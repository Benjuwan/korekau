import { ReactNode, memo } from "react";
import { useScrollTop } from "../hooks/useScrollTop";

export const EditerViewer = memo(({ children }: { children: ReactNode }) => {
    const { scrollTop } = useScrollTop();

    const editerView: (btnElm: HTMLButtonElement) => void = (btnElm: HTMLButtonElement) => {
        const editerView = btnElm.closest('.editerView') as HTMLDivElement;
        editerView.classList.add('OnView');
    }

    return (
        <div className="editerView leading-none">
            <button type="button" className="editBtn w-fit cursor-pointer hover:brightness-[1.25]" onClick={(btnElm: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                editerView(btnElm.currentTarget);
                scrollTop();
            }}><span className="material-symbols-outlined text-white align-middle shadow-[0_0_8px_rgba(0,0,0,.25)_inset] rounded p-[.25em] bg-[#59b835]">edit</span></button>
            {children}
        </div>
    );
});