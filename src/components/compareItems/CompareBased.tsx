import styled from "styled-components";
import { memo, useState } from "react";
import { CompareItemsType } from "./ts/compareItems";
import { CompareForm } from "./utils/CompareForm";
import { CompareItems } from "./utils/CompareItems";

export const CompareBased = memo(() => {
    const [compareItems, setCompareItems] = useState<CompareItemsType[]>([]);

    return (
        <CompareItemWrapper>
            <h2>商品価格の比較</h2>
            <CompareForm props={{
                compareItems: compareItems,
                setCompareItems: setCompareItems
            }} />
            <CompareItems compareItems={compareItems} />
        </CompareItemWrapper>
    );
});

const CompareItemWrapper = styled.section`
    & h2 {
        font-weight: normal;
        font-size: 1.8rem;
    }

@media screen and (min-width: 1025px) {
    & h2 {
        font-size: 18px;
    }
}
`;