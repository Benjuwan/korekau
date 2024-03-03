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
    return (
        <Swiper
            slidesPerView={1}
            initialSlide={1} // スライダー2枚目から表示
            centeredSlides={true}
            speed={1500}
            grabCursor={true}
            className="useSwiper"
            modules={[Pagination]}
        >
            <SwiperSlide><Calendar /></SwiperSlide>
            <SwiperSlide><KorekauBased /></SwiperSlide>
        </Swiper>
    );
});