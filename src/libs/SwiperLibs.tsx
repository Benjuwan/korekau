import styled from 'styled-components';
import { memo, useEffect } from 'react';
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

// import required modules【使いたい機能】
import { Pagination } from "swiper/modules";

export const SwiperLibs = memo(() => {
    const [isDesktopView, setDesktopView] = useAtom(isDesktopViewAtom);

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

        if (window.matchMedia("(min-width: 960px)").matches) setDesktopView(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SwiperLibsWrapper>
            <Swiper
                slidesPerView={1}
                initialSlide={1} // スライダー2枚目（KorekauBased）から表示
                spaceBetween={56}
                speed={1000}
                className="useSwiper"
                style={isDesktopView ? undefined : { 'overflow': 'unset' }} // スマホ・タブレットの時（960px 以下）は overflow:hidden を解除
                modules={[Pagination]}
                pagination={{ renderBullet, clickable: true }}
                onSlideChange={() => scrollTop()}
            >
                <SwiperSlide><Introduction /></SwiperSlide>
                <SwiperSlide><KorekauBased /></SwiperSlide>
                <SwiperSlide><CompareBased /></SwiperSlide>
                <SwiperSlide><Calendar /></SwiperSlide>
                <SwiperSlide><TrashBased /></SwiperSlide>
            </Swiper>
        </SwiperLibsWrapper>
    );
});

const SwiperLibsWrapper = styled.div`
padding: 0 1em;

    & .swiper-pagination {
        top: -1.5em;
        height: fit-content;
        
        & .swiperPaginationChildrenWrapper {
            width: 100%!important;
            display: flex;
            gap: 1em;
            justify-content: flex-start;
            align-items: flex-start;
            flex-flow: row wrap;
        }
        
        & button {
            font-size: calc(100vw/44);
            width: fit-content;
            appearance: none;
            background: none;
            border-radius: 0;
            border-bottom:  3px solid transparent;
            display: block;
            text-align: left;
            padding: 0 0 1.5em 0;
            letter-spacing: 0.25em;
            margin: 0!important;

            &.swiper-pagination-bullet-active {
                color: #1e6cd4;
                border-color: #1e6cd4;
            }
        }
    }

    & .swiper-wrapper {
        padding-top: 2.5em;
    }

@media screen and (min-width: 700px) {
    & .swiper-pagination {
        top: -1em;

        & .swiperPaginationChildrenWrapper {
            gap: .5em;

            & button {
                font-size: 14px;
            }
        }
    }
}

@media screen and (min-width: 1025px) {
    & .swiper-pagination {
        top: 0;

        & .swiperPaginationChildrenWrapper {
            gap: 1em;
        }
    }
}
`;