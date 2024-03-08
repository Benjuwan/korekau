import styled from "styled-components";
import { memo, useEffect, useState } from "react";
import { trashType } from "../ts/trash";
import { useAtom } from "jotai";
import { trashDateAtom } from "../../../ts/trash-atom";
import { TrashDateDetails } from "./TrashDateDetails";

export const FilteredTrashDayList = memo(() => {
    const [trashDateLists] = useAtom(trashDateAtom);
    
    const [filteredTrashDayLists, setFilteredTrashDayLists] = useState<trashType[]>([]);
    useEffect(() => {
        const theDayofToday: number = new Date().getDay();
        let isSat: boolean = theDayofToday + 1 === 7;

        const filteredLists: trashType[] = trashDateLists.filter(trashDateList => {
            if (isSat) {
                if (trashDateList.day === 0) return trashDateList;
            } else {
                if (trashDateList.day === (theDayofToday + 1)) return trashDateList;
            }
        });

        setFilteredTrashDayLists((_prevFilteredTrashDayLists) => filteredLists);
    }, [trashDateLists]);

    return (
        <TrashLists>
            {filteredTrashDayLists.length > 0 &&
                <div className="wrapper">
                    <p className="notice"><span className="material-symbols-outlined">error</span>明日は以下のゴミ出しがあります。</p>
                    {filteredTrashDayLists.map((filteredTrashDayList, i) => (
                        <div key={i}>
                            <TrashDateDetails trashDateList={filteredTrashDayList} />
                        </div>
                    ))}
                </div>
            }
        </TrashLists>
    );
});

const TrashLists = styled.div`
width: clamp(30rem, 100%, 60rem);
padding: 0 1em;
margin: 0 auto 2.5em;

    & .wrapper {
        padding: 1em;
        background-color: #fff;
        box-shadow: 0 0 8px rgba(160, 160, 160, .5) inset;
        border-radius: .4rem;
        
        & p {
            &.notice {
                line-height: 1;
                margin-bottom: .5em;
                
                & span {
                    font-size: 1.6rem;
                    vertical-align: top;
                    margin-right: .5em;
                }
            }

            &:not(.notice) {
                padding-left: 1em;
                color: #cc3226;
            }
        }
    }

@media screen and (min-width: 1025px) {
width: clamp(300px, 100%, 960px);

    & .wrapper {
        border-radius: 4px;

        & p {
            &.notice{
                & span {
                    font-size: 16px;
                }
            }
        }
    }
}
`;