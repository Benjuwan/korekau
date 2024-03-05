import styled from 'styled-components';
import { memo } from 'react';
import { Calendar } from '../components/schedule/calendar/Calendar';
import { KorekauBased } from '../components/korekau/KorekauBased';

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
    const navListsLable = ['買うものリスト', 'カレンダー'];
    const renderBullet = (index: number) => {
        return `<button type="button" class="swiper-pagination-bullet">${navListsLable[index]}</button>`;
    }

    return (
        <SwiperLibsWrapper>
            <Swiper
                slidesPerView={1}
                centeredSlides={true}
                speed={1000}
                grabCursor={true}
                className="useSwiper"
                modules={[Pagination]}
                pagination={{ renderBullet, clickable: true }}
            >
                <SwiperSlide><KorekauBased /></SwiperSlide>
                <SwiperSlide><Calendar /></SwiperSlide>
            </Swiper>
        </SwiperLibsWrapper>
    );
});

const SwiperLibsWrapper = styled.div`
    & .swiper-pagination {
        top: 0;
        display: flex;
        gap: 2%;
        justify-content: flex-start;
        align-items: flex-start;
        height: fit-content;

        & button {
            appearance: none;
            background: none;
            border-radius: 0;
            border-bottom:  3px solid transparent;
            display: block;
            text-align: left;
            width: fit-content;
            padding: 0 0 1.5em 0;
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
`;