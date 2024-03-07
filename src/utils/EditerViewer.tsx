import styled from "styled-components";
import { ReactNode, memo } from "react";
import { useScrollTop } from "../hooks/useScrollTop";

export const EditerViewer = memo(({ children }: { children: ReactNode }) => {
    const { scrollTop } = useScrollTop();

    const editerView: (btnElm: HTMLButtonElement) => void = (btnElm: HTMLButtonElement) => {
        const editerView = btnElm.closest('.editerView') as HTMLDivElement;
        editerView.classList.add('OnView');
    }

    return (
        <EditerView className="editerView">
            <button type="button" className="editBtn" onClick={(btnElm: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                editerView(btnElm.currentTarget);
                scrollTop();
            }}><figure><span className="material-symbols-outlined">edit</span></figure></button>
            {children}
        </EditerView>
    );
});

const EditerView = styled.div`
line-height: 1;

& button {
    width: fit-content;
    appearance: none;
    background-color: transparent;
    border-radius: 0;
    border: 0;
    padding: 0;
    cursor: pointer;

    & figure {
        & span {
            color: #fff;
            vertical-align: middle;
            box-shadow: 0 0 8px rgba(0, 0, 0, .25) inset;
            border-radius: .4rem;
            padding: .25em;
            background-color: #59b835;
        }
    }
}

& .itemEditer {
    opacity: 0;
    visibility: hidden;
    padding: 1em;
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, .5);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    transition: all .25s;
}

&.OnView {
    & .itemEditer {
        opacity: 1;
        visibility: visible;
    }
}

@media screen and (min-width: 1025px) {
    & button {
        & figure {
            & span {
                border-radius: 4px;
            }
        }
    }

    & .itemEditer {
        width: 100%;
    }
}
`;