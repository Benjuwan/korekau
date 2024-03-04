import { ChangeEvent, memo, useState } from "react";
import { korekauItemsType } from "./ts/korekau";
import { useAtom } from "jotai";
import { korekauAtom } from "../../ts/korekau-atom";

export const KorekauBased = memo(() => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);

    const [itemCategory, setItemCategory] = useState<string>('');
    const [itemName, setItemName] = useState<string>('');
    const [itemNumber, setItemNumber] = useState<number>(1);
    const handleInputItemNumber: (maxNum: string, itemNumber: string) => void = (maxNum: string, itemNumber: string) => {
        if (parseInt(itemNumber) < parseInt(maxNum)) setItemNumber((_prevItemName) => parseInt(itemNumber));
    }

    const regiKorekau: () => void = () => {
        const newKorekauItems: korekauItemsType = {
            itemName: itemName,
            itemNumber: itemNumber,
            itemCategory: itemCategory
        }
        if ((itemCategory.length && itemName.length && itemNumber) > 0) {
            setKorekauLists((_prevKorekauLists) => [...korekauLists, newKorekauItems]);
        }
        setItemCategory('');
        setItemName('');
        setItemNumber(0);
    }

    const editItemNumber = (item: korekauItemsType, index: number, itemUpdateNumber: number) => {
        console.log(item.itemNumber);

        const updateKorekauItems: korekauItemsType = {
            itemName: item.itemName,
            itemNumber: itemUpdateNumber,
            itemCategory: item.itemCategory
        }
        const shallowCopy: korekauItemsType[] = [...korekauLists];
        shallowCopy.splice(index, 1, updateKorekauItems); // splice（切取＆置換）した結果ではなく「処理結果の残り分（shallowCopy）を更新関数に渡す」ので「変数への代入」を行わず、shallowCopy を以下の setter 関数に渡している。
        // setKorekauLists((_prevKorekauLists) => shallowCopy);
        console.log(updateKorekauItems, shallowCopy);
    }

    return (
        <>
            <form action="" onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
                formElm.preventDefault();
                regiKorekau();
            }}>
                <select name="korekauCategories" id="korekauCategories" onChange={(e: ChangeEvent<HTMLSelectElement>) => setItemCategory(e.target.value)}>
                    <option value="others" selected>その他</option>
                    <option value="food_drink">食料品</option>
                    <option value="utils">日用品</option>
                    <option value="family">家族</option>
                </select>
                <input type="text" value={itemName} onInput={(e: ChangeEvent<HTMLInputElement>) => setItemName((_prevItemName) => e.target.value)} />
                <input type="number" min={1} max={99} value={itemNumber} onInput={(e: ChangeEvent<HTMLInputElement>) => handleInputItemNumber(e.target.max, e.target.value)} />
                <input type="submit" value={'登録'} />
            </form>

            {korekauLists.length > 0 &&
                <ul>
                    {korekauLists.map((korekauList, i) => (
                        <li key={i}>
                            <figure>
                                {korekauList.itemCategory === 'others' && <span className="material-symbols-outlined">category</span>}
                                {korekauList.itemCategory === 'food_drink' && <span className="material-symbols-outlined">restaurant</span>}
                                {korekauList.itemCategory === 'utils' && <span className="material-symbols-outlined">household_supplies</span>}
                                {korekauList.itemCategory === 'family' && <span className="material-symbols-outlined">family_restroom</span>}
                            </figure>
                            <p>{korekauList.itemName}<span><input type="number" value={korekauList.itemNumber} onInput={(e: ChangeEvent<HTMLInputElement>) => editItemNumber(korekauList, i, parseInt(e.target.value))} /></span></p>
                        </li>
                    ))}
                </ul>
            }
        </>
    );
});