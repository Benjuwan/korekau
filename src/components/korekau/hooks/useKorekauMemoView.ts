export const useKorekauMemoView = () => {
    const korekauMemoView: (btnEl: HTMLButtonElement) => void = (btnEl: HTMLButtonElement) => {
        const korekauMemo = btnEl.closest('.korekauMemo') as HTMLDivElement;
        korekauMemo.classList.toggle('OnView');
    }

    return { korekauMemoView }
}