export const useScrollTop = () => {
    const scrollTop = () => window.scrollTo(0, 0);
    return { scrollTop }
}