import styled from "styled-components";
import { memo, useEffect, useState } from "react";
import { korekauItemsType } from "../ts/korekau";
import { useAtom } from "jotai";
import { korekauAtom } from "../../../ts/korekau-atom";
import { KorekauItemIcons } from "./KorekauItemIcons";
import { useDeleteItem } from "../hooks/useDeleteItem";
import { KorekauItemEditer } from "./KorekauItemEditer";

export const KorekauItems = memo(({ category }: { category: string }) => {
    const [korekauLists] = useAtom(korekauAtom);

    const { deleteItem } = useDeleteItem();

    const [filteredItems, setFilteredItems] = useState<korekauItemsType[]>([]);
    useEffect(() => {
        const filtered = korekauLists.filter(filteredItem => {
            if (filteredItem.itemCategory === category) return filteredItem;
        });
        setFilteredItems((_prevFilteredItems) => filtered);
    }, [korekauLists]);

    const editerView: (btnElm: HTMLButtonElement) => void = (btnElm: HTMLButtonElement) => {
        const editerView = btnElm.closest('.editerView') as HTMLDivElement;
        editerView.classList.add('OnView');
    }

    return (
        <>
            {filteredItems.length > 0 &&
                <KorekauItemLists>
                    <ul>
                        <li className="headingElm flexBox"><h2 className="flexBox"><KorekauItemIcons category={category} />
                            {category === 'food_drink' && '食料品'}
                            {category === 'utils' && '日用品'}
                            {category === 'family' && '家族'}
                            {category === 'others' && 'その他'}
                        </h2></li>
                        {filteredItems.map((korekauList, i) => (
                            <li className="korekauList flexBox" key={i}>
                                <div className="listItem flexBox">
                                    <p>{korekauList.itemName}<span>【{korekauList.itemNumber}】</span></p>
                                </div>
                                <div className="ctrlZone flexBox">
                                    <div className="editerView">
                                        <button type="button" className="editBtn" onClick={(btnElm) => editerView(btnElm.currentTarget)}><figure><span className="material-symbols-outlined">edit</span></figure></button>
                                        <KorekauItemEditer props={{
                                            classNameStr: 'itemEditer',
                                            category: category,
                                            korekauList: korekauList
                                        }} />
                                    </div>
                                    <button type="button" className="deleteBtn" onClick={() => deleteItem(korekauList.itemName)}><figure><span className="material-symbols-outlined">delete</span></figure></button>
                                </div>
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

    & ul {
        list-style: none;
        padding-right: 1em;
        margin-bottom: 5em;
        
        & li {
            &:not(:last-of-type){
                margin-bottom: 1em;
            }

            & figure {
                span {
                    vertical-align: middle;
                    box-shadow: 0 0 8px rgba(0, 0, 0, .5) inset;
                    background-color: #fff;
                    aspect-ratio: 1 / 1;
                    border-radius: 50%;
                    padding: .25em;
                }
            }
            
            &.headingElm {
                padding: 1em;
                box-shadow: 0 0 16px rgba(160, 160, 160, 0.25) inset;
                margin-bottom: 1em;
                border-radius: 5rem;

                & h2 {
                    font-size: 1.6rem;
                    font-weight: normal;
                    letter-spacing: 0.25em;
                }
            }

            &.korekauList {
                padding: 1em;
                background-color: #f2f2f2;
                border-radius: .8rem;
                font-size: 1.4rem;
                gap: 2%;

                & .listItem {
                    width: clamp(16rem, 68%, 56rem);

                    & p {
                        width: 100%;
                        overflow-wrap: break-word; // 区切りがないとブラウザは一文として処理するので改行指定のスタイルを指定しておく

                        & span {
                            text-align: right;
                            color: #59b835;
                        }
                    }
                }

                & .ctrlZone {
                    width: 30%;
                    justify-content: flex-end;

                    & .editerView {
                        & .itemEditer {
                            opacity: 0;
                            visibility: hidden;
                            width: 100%;
                            height: 100%;
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background-color: rgba(255, 255, 255, .5);
                            -webkit-backdrop-filter: blur(8px);
                            backdrop-filter: blur(8px);
                            transition: all .25s;
                        }
                        
                        &.OnView {
                            & .itemEditer {
                                opacity: 1;
                                visibility: visible;
                            }
                        }
                    }

                    & button {
                        width: fit-content;
                        appearance: none;
                        background-color: transparent;
                        border-radius: 0;
                        border: 0;
                        padding: 0;
                        cursor: pointer;

                        & figure {
                            & span {
                                color: #fff;
                                border-radius: .4rem;
                            }
                        }

                        &:hover {
                            & figure {
                                & span {
                                    filter:brightness(1.5);
                                }
                            }
                        }

                        &.editBtn {
                            & figure {
                                & span {
                                    background-color: #59b835;
                                }
                            }
                        }

                        &.deleteBtn {
                            & figure {
                                & span {
                                    background-color: #cc3226;
                                }
                            }
                        }
                    }
                }
            }

            @media screen and (min-width: 960px) {
                & ul {
                    & li {
                        &.headingElm {
                            border-radius: 50px;

                            & h2 {
                                font-size: 16px;
                            }
                        }

                        &.korekauList {
                            border-radius: 8px;
                            font-size: 14px;

                            & button {
                                & figure {
                                    & span {
                                        border-radius: 4px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;