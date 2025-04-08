import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, memo, useState } from "react";
import { CompareItemsType } from "../ts/compareItems";
import { useHandleFormEntries } from '../../../hooks/useHandleFormEntries';

type CompareFormType = {
    compareItems: CompareItemsType[];
    setCompareItems: React.Dispatch<React.SetStateAction<CompareItemsType[]>>;
}

export const CompareForm = memo(({ props }: { props: CompareFormType }) => {
    const { compareItems, setCompareItems } = props;

    const initCompareItem: CompareItemsType = {
        uuid: '',
        amount: '',
        price: '',
        result: '',
    }
    const [compareItem, setCompareItem] = useState<CompareItemsType>(initCompareItem);

    const { handleFormEntries } = useHandleFormEntries();

    const entryCompareItem: () => void = () => {
        const price: number = typeof compareItem.price !== 'number' ? parseInt(compareItem.price) : compareItem.price;
        const amount: number = typeof compareItem.amount !== 'number' ? parseInt(compareItem.amount) : compareItem.amount;

        const calcValue: number = price / amount;
        const result: string = parseFloat(String(calcValue)).toFixed(3);

        const newCompareItem: CompareItemsType = {
            ...compareItem,
            uuid: uuidv4(), // key に渡すための固有の識別子を生成
            result: result
        }
        setCompareItems([...compareItems, newCompareItem]);
    }

    return (
        <form action="" className='shadow-[0_0_8px_rgba(160,160,160,.5)_inset] p-[1em] w-full rounded text-[0.875rem]' onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            entryCompareItem();
            setCompareItem(initCompareItem);
        }}>
            <label htmlFor="amount" className="flex flex-row flex-wrap w-full align-center gap-[2%] mb-[1em] leading-[2]">
                <span className="inline-block w-[38%] border-l border-l-[.25rem] border-l-[#333] pl-[.5em]">容量・個数</span>
                <input type="text" inputMode="numeric" pattern="\d*" value={compareItem.amount} id="amount" className="text-[1rem] rounded w-[60%] border border-[#333] pl-[.5em]" min={0} onInput={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<CompareItemsType>(e, compareItem, setCompareItem, "compare")} />
            </label>
            <label htmlFor="price" className="flex w-full align-center gap-[2%] mb-[1em] leading-[2]">
                <span className="inline-block w-[38%] border-l border-l-[.25rem] border-l-[#333] pl-[.5em]">価格</span>
                <input type="text" inputMode="numeric" pattern="\d*" value={compareItem.price} id="price" className="text-[1rem] rounded w-[60%] border border-[#333] pl-[.5em]" min={0} onInput={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<CompareItemsType>(e, compareItem, setCompareItem, "compare")} />
            </label>
            <button className="text-white bg-[#333] rounded border border-transparent leading-[2.75rem] w-full disabled:text-[#999] disabled:bg-[#dadada] not-disabled:hover:cursor-pointer not-disabled:hover:text-[#333] not-disabled:hover:border-[#333] not-disabled:hover:bg-white" disabled={compareItem.price.toString().length === 0 || compareItem.amount.toString().length === 0}>計算</button>
        </form>
    );
});