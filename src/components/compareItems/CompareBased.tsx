import { memo, useState } from "react";
import { CompareItemsType } from "./ts/compareItems";
import { CompareForm } from "./utils/CompareForm";
import { CompareItems } from "./utils/CompareItems";

export const CompareBased = memo(() => {
    const [compareItems, setCompareItems] = useState<CompareItemsType[]>([]);

    return (
        <section>
            <h2 className="text-[1.125rem] mb-[.5em]">商品価格の比較</h2>
            <CompareForm props={{
                compareItems: compareItems,
                setCompareItems: setCompareItems
            }} />
            <CompareItems compareItems={compareItems} />
        </section>
    );
});