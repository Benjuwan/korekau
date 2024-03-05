import { ChangeEvent, memo, useMemo, useState } from "react";
import { useRegiKorekauItem } from "../hooks/useRegiKorekauItem";
import { korekauItemsType } from "../ts/korekau";
import { useAtom } from "jotai";
import { korekauAtom } from "../../../ts/korekau-atom";
import { useUpdateKorekauItems } from "../hooks/useUpdateKorekauItems";
import styled from "styled-components";

export const KorekauForm = memo(({ KorekauItemList }: { KorekauItemList?: korekauItemsType }) => {
    const [korekauLists] = useAtom(korekauAtom)
    const { regiKorekauItem } = useRegiKorekauItem();
    const { updateKorekauItems } = useUpdateKorekauItems();

    const defaultItemCategoty: string = useMemo(() => {
        return KorekauItemList ? KorekauItemList.itemCategory : 'food_drink';
    }, [korekauLists]);

    const [itemCategory, setItemCategory] = useState<string>(defaultItemCategoty);
    const [itemName, setItemName] = useState<string>('');
    const [itemNumber, setItemNumber] = useState<number>(1);
    const handleInputItemNumber: (maxNum: string, itemNumber: string) => void = (maxNum: string, itemNumber: string) => {
        if (parseInt(itemNumber) <= parseInt(maxNum)) {
            setItemNumber((_prevItemNumber) => parseInt(itemNumber));
        }
    }

    return (
        <KorekauFormElm action="" onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            KorekauItemList ?
                updateKorekauItems(
                    KorekauItemList,
                    itemName,
                    itemNumber,
                    itemCategory
                ) :
                regiKorekauItem(
                    itemName,
                    itemNumber,
                    itemCategory,
                    setItemName,
                    setItemNumber
                );
        }}>
            <select name="korekauCategories" id="korekauCategories" defaultValue={defaultItemCategoty} onChange={(e: ChangeEvent<HTMLSelectElement>) => setItemCategory(e.target.value)}>
                <option value="food_drink">食料品</option>
                <option value="utils">日用品</option>
                <option value="family">家族</option>
                <option value="others">その他</option>
            </select>
            <input type="text" value={itemName} onInput={(e: ChangeEvent<HTMLInputElement>) => setItemName((_prevItemName) => e.target.value)} placeholder={KorekauItemList && KorekauItemList.itemName} />
            <input type="number" min={1} max={99} value={itemNumber} onInput={(e: ChangeEvent<HTMLInputElement>) => handleInputItemNumber(e.target.max, e.target.value)} />
            <input type="submit" value={KorekauItemList ? '再登録' : '登録'} />
        </KorekauFormElm>
    );
});

const KorekauFormElm = styled.form`

`;