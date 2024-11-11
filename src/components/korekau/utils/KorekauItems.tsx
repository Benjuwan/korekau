import styled from "styled-components";
import { memo, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { korekauAtom } from "../../../ts/korekau-atom";
import { korekauItemsType } from "../ts/korekau";
import { KorekauItemIcons } from "./KorekauItemIcons";
import { KorekauItemEditer } from "./KorekauItemEditer";
import { EditerViewer } from "../../../utils/EditerViewer";
import { PartKorekauItemsMemo } from "./PartKorekauItemsMemo";
import { PartKorekauItemsImg } from "./PartKorekauItemsImg";
import { useDeleteItem } from "../hooks/useDeleteItem";

export const KorekauItems = memo(({ category }: { category: string }) => {
    const [korekauLists] = useAtom(korekauAtom);

    const { deleteItem } = useDeleteItem();

    const [filteredItems, setFilteredItems] = useState<korekauItemsType[]>([]);
    useEffect(() => {
        const filtered = korekauLists.filter(filteredItem => filteredItem.itemCategory === category).sort((aheadItem, behindItem) => {
            const aheadItemPriority = aheadItem.itemPriority ?? false;
            const behindItemPriority = behindItem.itemPriority ?? false;
            if (aheadItemPriority && !behindItemPriority) return -1; // 比較関数が負の値を返した場合、aはbの前に来る
            if (!aheadItemPriority && behindItemPriority) return 1; // 比較関数が正の値を返した場合、bはaの前に来る
            return 0; // 比較関数が0を返した場合、aとbの順序は変わらない
        });
        setFilteredItems((_prevFilteredItems) => filtered);
    }, [korekauLists]);

    return (
        <>
            {filteredItems.length > 0 &&
                <KorekauItemLists>
                    <ul>
                        <li className="headingElm flexBox">
                            <KorekauItemIcons category={category} />
                            <h2 className="flexBox">
                                {category === 'food_drink' && '食料品'}
                                {category === 'utils' && '日用品'}
                                {category === 'family' && '家族'}
                                {category === 'myself' && '自分'}
                                {category === 'others' && 'その他'}
                            </h2>
                        </li>
                        {filteredItems.map(korekauList => (
                            <li className={korekauList.itemPriority ? 'priority korekauList flexBox' : 'korekauList flexBox'} key={korekauList.uuid}>
                                <div className="listItem flexBox">
                                    <p>{korekauList.itemName}<span>×{korekauList.itemNumber}</span></p>
                                </div>
                                <div className="ctrlZone flexBox">
                                    <EditerViewer children={
                                        <KorekauItemEditer props={{
                                            classNameStr: 'itemEditer',
                                            category: category,
                                            korekauList: korekauList
                                        }} />
                                    } />
                                    <button type="button" className="deleteBtn" onClick={() => deleteItem(korekauList)}><span className="material-symbols-outlined">delete</span></button>
                                </div>
                                {korekauList.itemMemo &&
                                    <PartKorekauItemsMemo korekauList={korekauList} />
                                }
                                {korekauList.itemImg &&
                                    <PartKorekauItemsImg korekauList={korekauList} />
                                }
                            </li>
                        ))}
                    </ul>
                </KorekauItemLists>
            }
        </>
    );
});

const KorekauItemLists = styled.section`
    & .flexBox {
        display: flex;
        align-items: center;
        flex-flow: row wrap;
        gap: 1em;
    }

    & button {
        appearance: none;
        background-color: transparent;
        border-radius: 0;
        border: 0;
        padding: 0;
        cursor: pointer;
    }

    & ul {
        list-style: none;
        margin-bottom: 5em;
        
        & li {
            &:not(:last-of-type){
                margin-bottom: 1em;
            }

            span.material-symbols-outlined {
                vertical-align: middle;
                box-shadow: 0 0 8px rgba(0, 0, 0, .25) inset;
                background-color: #fff;
                aspect-ratio: 1 / 1;
                border-radius: 50%;
                padding: .25em;
            }
            
            &.headingElm {
                margin-bottom: 1em;
                flex-wrap: nowrap;
                
                & h2 {
                    width: 100%;
                    padding: .5em 1em;
                    box-shadow: 0 0 16px rgba(160, 160, 160, 0.25) inset;
                    font-weight: normal;
                    letter-spacing: 0.25em;
                    border-radius: 5rem;
                    font-size: 1.6rem;
                }
            }

            &.korekauList {
                padding: 1em;
                background-color: #f2f2f2;
                border-radius: .8rem;
                font-size: 1.6rem;
                gap: 2%;
                position: relative; // PartKorekauItemsMemo.tsx 用の基準元 relative

                &.priority {
                    background-color: #f3e0ab;
                }

                & .listItem {
                    width: clamp(16rem, 58%, 56rem);

                    & p {
                        width: 100%;
                        overflow-wrap: anywhere; // 区切りがないとブラウザは一文として処理するので改行指定のスタイルを指定しておく

                        & span {
                            margin-left: 1em;
                            color: #59b835;
                        }
                    }
                }

                & .ctrlZone {
                    width: 40%;
                    justify-content: flex-end;

                    & button {
                        width: fit-content;
                        cursor: pointer;
                        
                        & span {
                            color: #fff;
                            border-radius: .4rem;
                        }

                        &:hover {
                            &.deleteBtn {
                                & span {
                                    filter:brightness(1.25);
                                }
                            }
                        }

                        &.editBtn {
                            & span {
                                background-color: #59b835;
                            }
                        }

                        &.deleteBtn {
                            & span {
                                background-color: #cc3226;
                            }
                        }
                    }
                }
            }
        }
    }

@media screen and (min-width: 1025px) {
    & ul {
        & li {
            &.headingElm {
                & h2 {
                    border-radius: 50px;
                    font-size: 16px;
                }
            }

            &.korekauList {
                border-radius: 8px;
                font-size: 16px;

                & .ctrlZone {
                    & button {
                        & span {
                            border-radius: 4px;
                        }
                    }
                }
            }
        }
    }
}
`;