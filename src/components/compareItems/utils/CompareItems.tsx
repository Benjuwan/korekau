import { memo } from "react";
import { CompareItemsType } from "../ts/compareItems";

export const CompareItems = memo(({ compareItems }: { compareItems: CompareItemsType[] }) => {
    return (
        <>
            {compareItems.length > 0 &&
                <ul className="compareItems my-[2.5em] mx-auto">
                    <li className="mb-[1em] w-fit border-b border-b-[#333]">※小数点以下3桁目を四捨五入</li>
                    {compareItems.map((compareItem, i) => (
                        <li key={compareItem.uuid} className="mb-[1em]">入力項目「No.{i + 1}」は、価格（{compareItem.price}）に対して指定した容量・個数（{compareItem.amount}）あたり【<span className="font-bold">{compareItem.result}</span>円】です。</li>
                    ))}
                </ul>
            }
        </>
    );
});