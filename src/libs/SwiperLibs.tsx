import { memo, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { isDesktopViewAtom } from '../ts/calendar-atom';
import { Introduction } from '../components/Introduction';
import { KorekauBased } from '../components/korekau/KorekauBased';
import { Calendar } from '../components/schedule/calendar/Calendar';
import { TrashBased } from '../components/trash/TrashBased';
import { CompareBased } from '../components/compareItems/CompareBased';
import { useScrollTop } from '../hooks/useScrollTop';

/**
 * reactでのswiperは【使いたいCSSと機能】を必要に応じて記述して（読み込んで使って）いくスタイル 
*/

// Import Swiper React components【スワイパー自体の読込】
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles【使いたいCSS】
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "../global-swiper.css"; // 独自のスタイルシートを用意（※一番最後に読み込ませる）

// import required modules【使いたい機能】
import { Pagination } from "swiper/modules";

export const SwiperLibs = memo(() => {
    const [, setDesktopView] = useAtom(isDesktopViewAtom);
    const [activeContentHeight, setActiveContentHeight] = useState<number>(0);
    const { scrollTop } = useScrollTop();

    const navListsLable = ['コレカウとは？', '買うものリスト', '商品価格の比較', 'カレンダー', 'ゴミ出し日'];
    const renderBullet = (index: number) => {
        return `<button type="button" class="swiper-pagination-bullet">${navListsLable[index]}</button>`;
    }

    useEffect(() => {
        const swiperPagination = document.querySelector('.swiper-pagination') as HTMLDivElement;
        const childrennavLists: HTMLCollection = swiperPagination.children;

        const swiperPaginationChildren: HTMLDivElement = document.createElement("div");
        swiperPaginationChildren.className = 'swiperPaginationChildrenWrapper swiperPaginationNavLists';
        swiperPaginationChildren.id = 'swiperPaginationNav';

        let targetWidth: number = 0;
        Array.from(childrennavLists).forEach(childrennavList => {
            targetWidth += childrennavList.clientWidth;
            swiperPaginationChildren.appendChild(childrennavList);
        });
        if (navListsLable.length >= 3) swiperPaginationChildren.style.setProperty('width', `${targetWidth * 1.5}px`);

        swiperPagination.appendChild(swiperPaginationChildren);

        if (window.matchMedia("(min-width: 960px)").matches) {
            setDesktopView(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkActiveContentHeight: () => void = () => {
        const swiperSlideActive: HTMLElement | null = document.querySelector('.swiper-slide-active');
        if (swiperSlideActive == null) {
            return;
        }

        const contentHeight: number | undefined = swiperSlideActive.firstElementChild?.clientHeight;
        if (typeof contentHeight === 'undefined') {
            return;
        }

        setActiveContentHeight(contentHeight);
    }

    return (
        <div className='SwiperLibsWrapper px-[1em]'>
            <Swiper
                slidesPerView={1}
                initialSlide={1} // スライダー2枚目（KorekauBased）から表示
                spaceBetween={56}
                speed={1000}
                className="useSwiper"
                modules={[Pagination]}
                pagination={{ renderBullet, clickable: true }}
                onSlideChange={scrollTop}
                onSlideChangeTransitionEnd={checkActiveContentHeight} // スワイプイベント終了時にコンテンツの高さを取得
            >
                <SwiperSlide
                    className='mb-[2.5em]'
                    // 他のコンテンツの高さをある程度最適化するために、最も情報量が多い（＝ height が高い） Introduction コンテンツの高さを調整する
                    style={{ 'height': `${activeContentHeight}px` }}
                ><Introduction /></SwiperSlide>
                <SwiperSlide><KorekauBased /></SwiperSlide>
                <SwiperSlide><CompareBased /></SwiperSlide>
                <SwiperSlide><Calendar /></SwiperSlide>
                <SwiperSlide><TrashBased /></SwiperSlide>
            </Swiper>
        </div>
    );
});