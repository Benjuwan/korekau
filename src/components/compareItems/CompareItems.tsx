import styled from "styled-components";
import { ChangeEvent, memo, useState } from "react";

type CompareItemsType = {
    amount: number;
    price: number;
    result: string;
}

export const CompareItems = memo(() => {
    const [amount, setAmount] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [compareItems, setCompareItems] = useState<CompareItemsType[]>([]);

    const entryCompareItem = () => {
        const calcValue: number = price / amount;
        const result: string = parseFloat(String(calcValue)).toFixed(3);
        const newCompareItem: CompareItemsType = {
            price: price,
            amount: amount,
            result: result
        }
        setCompareItems((_prevCompareItems) => [...compareItems, newCompareItem]);
    }

    return (
        <CompareItemWrapper>
            <h2>商品価格の比較</h2>
            <form action="" onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
                formElm.preventDefault();
                entryCompareItem();
                setPrice(0);
                setAmount(0);
            }}>
                <label htmlFor="pieces">
                    <span>容量・個数</span>
                    <input type="number" value={amount} id="amount" min={0} onInput={(e: ChangeEvent<HTMLInputElement>) => setAmount((_prevAmount) => parseInt(e.target.value))} />
                </label>
                <label htmlFor="price">
                    <span>価格</span>
                    <input type="number" value={price} id="price" min={0} onInput={(e: ChangeEvent<HTMLInputElement>) => setPrice((_prevPrice) => parseInt(e.target.value))} />
                </label>
                <button disabled={(price && amount) <= 0}>計算</button>
            </form>
            {compareItems.length > 0 &&
                <ul className="compareItems">
                    <li>※小数点以下3桁目を四捨五入</li>
                    {compareItems.map((compareItem, i) => (
                        <li key={i}>入力項目「No.{i + 1}」は、価格（{compareItem.price}）に対して指定した容量・個数（{compareItem.amount}）あたり<span>{compareItem.result}</span>円です。</li>
                    ))}
                </ul>
            }
        </CompareItemWrapper>
    );
});

const CompareItemWrapper = styled.section`
    & h2 {
        font-weight: normal;
        font-size: 1.8rem;
    }

    & form {
        box-shadow: 0 0 8px rgba(160, 160, 160, .5) inset;
        padding: 1em;
        width: 100%;
        border-radius: .4rem;

        & label {
            display: block;
            width: 100%;
            display: flex;
            gap: 2%;
            margin-bottom: 1em;
            line-height: 2;

            & span {
                display: inline-block;
                width: 28%;
                border-left: 4px solid #333;
                padding-left: .5em;
            }

            & input {
                width: 70%;
                border-radius: .4rem;
                border: 1px solid #333;
                margin-left: 1em;
            }
        }

        & button {
            display: block;
            appearance: none;
            color: #fff;
            background-color: #333;
            border-radius: .4rem;
            border: 1px solid transparent;
            line-height: 4.4rem;
            width: 100%;
            
            &[disabled] {
                color: #999;
                background-color: #dadada;
            }
            
            &:not([disabled]):hover {
                cursor: pointer;
                color: #333;
                border-color: #333;
                background-color: #fff;
            }
        }
    }

    & .compareItems {
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
    }

@media screen and (min-width: 1025px) {
    & h2 {
        font-size: 18px;
    }

    & form {
        border-radius: 4px;
        & label {
            & input {
                border-radius: 4px;
            }
        }

        & button {
            border-radius: 4px;
            line-height: 44px;
        }
    }
}
`;