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
        setFilteredItems(filtered);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [korekauLists]);

    return (
        <>
            {filteredItems.length > 0 &&
                <section>
                    <ul className="mb-[5em]">
                        <li className="flex flex-row flex-nowrap items-center gap-[1em] mb-[1em]">
                            <KorekauItemIcons category={category} />
                            <h2 className="flex flex-row flex-wrap items-center gap-[1em] w-full py-[.5em] px-[1em] shadow-[0_0_16px_rgba(160,160,160,0.25)_inset] tracking-[0.25em] rounded-[3.125rem] text-[1rem]">
                                {category === 'food_drink' && '食料品'}
                                {category === 'utils' && '日用品'}
                                {category === 'family' && '家族'}
                                {category === 'myself' && '自分'}
                                {category === 'others' && 'その他'}
                            </h2>
                        </li>
                        {filteredItems.map(korekauList => (
                            <li className={`not-last-of-type:mb-[1em] flex flex-row flex-nowrap items-center p-[1em] bg-[#f2f2f2] rounded-[.5rem] text-[1rem] gap-[2%] relative ${korekauList.itemPriority ? 'flex flex-row flex-wrap items-center gap-[1em] bg-[#f3e0ab]' : 'flex flex-row flex-wrap items-center gap-[1em]'}`} key={korekauList.uuid}>
                                <div className="w-[clamp(10rem,58%,35rem)] flex flex-row flex-wrap items-center gap-[1em]">
                                    <p className="w-full wrap-anywhere">{korekauList.itemName}<span className="ml-[1em] text-[#59b835]">×{korekauList.itemNumber}</span></p>
                                </div>
                                <div className="w-[40%] flex flex-row flex-wrap items-center justify-end gap-[1em]">
                                    <EditerViewer children={
                                        <KorekauItemEditer props={{
                                            classNameStr: 'itemEditer',
                                            category: category,
                                            korekauList: korekauList
                                        }} />
                                    } />
                                    <button type="button" className="deleteBtn cursor-pointer w-fit bg-[#cc3226] rounded hover:brightness-[1.25]" onClick={() => deleteItem(korekauList)}><span className="material-symbols-outlined align-middle text-white aspect-square rounded-full p-[.25em]">delete</span></button>
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
                </section>
            }
        </>
    );
});
