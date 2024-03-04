import { useAtom } from "jotai";
import { useCallback } from "react"
import { navigationListsAtom } from "../ts/korekau-atom";

export const useNavigationBarCurr = () => {
    const [navCurrList] = useAtom(navigationListsAtom);

    const NavigationBarCurr = useCallback((navListLabel: string) => {
        const NavigationBarLists = document.querySelectorAll('.NavigationBar li') as NodeListOf<HTMLLIElement>;
        NavigationBarLists.forEach(navList => {
            navList.classList.remove('isActive');
            /* NavigationBar.tsx / SwiperLibs.tsx の当該要素（class / id名）に合致するリストをアクティブにする */
            if (navList.classList.contains(navListLabel)) navList.classList.add('isActive');
        });
    }, [navCurrList]);

    return { NavigationBarCurr }
}




/**
 * SwiperLibs.tsx
 * const { NavigationBarCurr } = useNavigationBarCurr();
    const slideChangeCtrlNavCurrList = () => {
        const swiperSlides = document.querySelectorAll('.swiper-slide');
        swiperSlides.forEach(swiperSlide => {
            if (swiperSlide.classList.contains('swiper-slide-active')) {
                const currListIdAttrStr = swiperSlide.getAttribute('id') as string;
                NavigationBarCurr(currListIdAttrStr);
            }
        });
    }
 */