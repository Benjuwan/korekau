import { memo } from "react";
import styled from "styled-components";

export const NavigationBar = memo(({ classNameStr }: { classNameStr: string }) => {
    return (
        <Navigations className="NavigationBar">
            <li className={`${classNameStr === 'scheduleCalendar' && 'isActive'}`}>カレンダー</li>
            <li className={`${classNameStr === 'korekau' && 'isActive'}`}>買うものリスト</li>
        </Navigations>
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

        &.isActive{
            color: #1d8ed4;
            border-color: #1d8ed4;
        }
    }
`;