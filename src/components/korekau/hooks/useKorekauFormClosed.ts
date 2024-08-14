export const useKorekauFormClosed = () => {
    const korekauFormClosed: () => void = () => {
        const korekauSectionForm: HTMLDetailsElement | null = document.querySelector('.korekauSection details');
        if (korekauSectionForm?.open) {
            korekauSectionForm.removeAttribute('open');
        }
    }

    return { korekauFormClosed }
}