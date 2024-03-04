import styled from "styled-components";
import { memo } from "react";
import { useNavigationBarCurr } from "../hooks/_useNavigationBarCurr";

export const NavigationBar = memo(() => {
    const { NavigationBarCurr } = useNavigationBarCurr();
    const handleListClick = (listNumber: number, clickedListBtnElm: HTMLButtonElement) => {
        const clickedListBtnElmIdAttrStr = clickedListBtnElm.getAttribute('id') as string;
        const swiperSlides = document.querySelectorAll('.swiper-slide');
        swiperSlides.forEach((swiperSlide, i) => {
            swiperSlide.classList.remove('swiper-slide-active');
            if (listNumber === i) {
                swiperSlide.classList.add('swiper-slide-active');
                NavigationBarCurr(clickedListBtnElmIdAttrStr);
            }
        });
    }

    return (
        <Navigations className="NavigationBar">
            {/* class名は SwiperLibs.tsx の SwiperSlide の id名と同名にする */}
            <li className="korekau isActive"><button id="korekau" type="button" onClick={(btnElm: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleListClick(0, btnElm.currentTarget)}>買うものリスト</button></li>
            <li className="scheduleCalendar"><button id="scheduleCalendar" type="button" onClick={(btnElm: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleListClick(1, btnElm.currentTarget)}>カレンダー</button></li>
        </Navigations >
    )
});

const Navigations = styled.ul`
list-style: none;
display: flex;
gap: 2%;
margin-bottom: 2.5em;
color: #9d9d9d;

    & li {
        border-bottom:  3px solid transparent;
        padding-bottom: .5em;

        & button {
            appearance: none;
            border: 1px solid transparent;
            border-radius: 0;
            background-color: transparent;
        }

        &.isActive{
            color: #1d8ed4;
            border-color: #1d8ed4;
        }
    }
`;