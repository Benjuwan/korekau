import styled from "styled-components";
import { memo } from "react";
import { CompareItemsType } from "../ts/compareItems";

export const CompareItems = memo(({ compareItems }: { compareItems: CompareItemsType[] }) => {
    return (
        <>
            {compareItems.length > 0 &&
                <CompareItem className="compareItems">
                    <li>※小数点以下3桁目を四捨五入</li>
                    {compareItems.map((compareItem, i) => (
                        <li key={i}>入力項目「No.{i + 1}」は、価格（{compareItem.price}）に対して指定した容量・個数（{compareItem.amount}）あたり<span>{compareItem.result}</span>円です。</li>
                    ))}
                </CompareItem>
            }
        </>
    );
});

const CompareItem = styled.ul`
list-style: none;
margin: 2.5em auto;

& li {
    margin-bottom: 1em;

    &:first-of-type {
        width: fit-content;
        margin-bottom: 1em;
        border-bottom: 1px solid #333;
    }

    & span {
        font-weight: bold;
    }
}
`;