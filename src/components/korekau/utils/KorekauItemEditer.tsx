import { memo } from "react";
import { korekauItemsType } from "../ts/korekau";
import { KorekauForm } from "./KorekauForm";
import { KorekauItemIcons } from "./KorekauItemIcons";

type itemEditerType = {
    classNameStr: string;
    category: string;
    korekauList: korekauItemsType;
};

export const KorekauItemEditer = memo(({ props }: { props: itemEditerType }) => {
    const { classNameStr, category, korekauList } = props;

    return (
        <div className={classNameStr}>
            <div className="p-[1em] shadow-[0_0_8px_rgba(0,0,0,.25)_inset] bg-white mb-[1em] rounded flex flex-row flex-wrap items-center gap-[1em]">
                <KorekauItemIcons category={category} />
                <p className="w-[80%] wrap-anywhere">{korekauList.itemName}<span className="mx-[1em] text-[#59b835]">×{korekauList.itemNumber}</span>の内容を編集</p>
                {korekauList.itemMemo &&
                    <p className="korekauMemo w-full text-[0.875rem] leading-[1.8]">【注釈メモ】<br />{korekauList.itemMemo}</p>
                }
            </div>
            <KorekauForm KorekauItemList={korekauList} />
        </div>
    );
});