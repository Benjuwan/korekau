import styled from "styled-components";
import { ChangeEvent, memo, useState } from "react";
import { CompareItemsType } from "../ts/compareItems";

type CompareFormType = {
    compareItems: CompareItemsType[];
    setCompareItems: React.Dispatch<React.SetStateAction<CompareItemsType[]>>;
}

export const CompareForm = memo(({ props }: { props: CompareFormType }) => {
    const { compareItems, setCompareItems } = props;

    const [amount, setAmount] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const entryCompareItem: () => void = () => {
        const calcValue: number = parseInt(price) / parseInt(amount);
        const result: string = parseFloat(String(calcValue)).toFixed(3);
        const newCompareItem: CompareItemsType = {
            price: parseInt(price),
            amount: parseInt(amount),
            result: result
        }
        setCompareItems((_prevCompareItems) => [...compareItems, newCompareItem]);
    }

    return (
        <CompareFormElm action="" onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            entryCompareItem();
            setPrice('');
            setAmount('');
        }}>
            <label htmlFor="amount">
                <span>容量・個数</span>
                <input type="text" inputMode="numeric" pattern="\d*" value={amount} id="amount" min={0} onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length === 0) setAmount('');
                    if (parseInt(e.target.value)) setAmount((_prevAmount) => e.target.value);
                }} />
            </label>
            <label htmlFor="price">
                <span>価格</span>
                <input type="text" inputMode="numeric" pattern="\d*" value={price} id="price" min={0} onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length === 0) setPrice('');
                    if (parseInt(e.target.value)) setPrice((_prevPrice) => e.target.value);
                }} />
            </label>
            <button disabled={(price.length && amount.length) <= 0}>計算</button>
        </CompareFormElm>
    );
});

const CompareFormElm = styled.form`
box-shadow: 0 0 8px rgba(160, 160, 160, .5) inset;
padding: 1em;
width: 100%;
border-radius: .4rem;

& label {
    display: block;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2%;
    margin-bottom: 1em;
    line-height: 2;

    & span {
        display: inline-block;
        width: 38%;
        border-left: 4px solid #333;
        padding-left: .5em;
    }

    & input {
        font-size: 1.6rem;
        border-radius: .4rem;
        width: 60%;
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

@media screen and (min-width: 1025px) {
    border-radius: 4px;
    
    & label {
        & input {
            font-size: 16px;
            border-radius: 4px;
        }
    }

    & button {
        border-radius: 4px;
        line-height: 44px;
    }
}
`;