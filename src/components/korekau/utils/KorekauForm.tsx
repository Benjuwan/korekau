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

    const defaultItemName: string = useMemo(() => {
        return KorekauItemList ? KorekauItemList.itemName : '';
    }, [korekauLists]);

    const [itemCategory, setItemCategory] = useState<string>(defaultItemCategoty);
    const [itemName, setItemName] = useState<string>(defaultItemName);
    const [itemNumber, setItemNumber] = useState<number>(1);
    const handleInputItemNumber: (maxNum: string, itemNumber: string) => void = (maxNum: string, itemNumber: string) => {
        if (parseInt(itemNumber) <= parseInt(maxNum)) {
            setItemNumber((_prevItemNumber) => parseInt(itemNumber));
        }
    }
    const [itemPriority, setItemPriority] = useState<boolean>(false);

    return (
        <KorekauFormElm action="" onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            KorekauItemList ?
                updateKorekauItems(
                    KorekauItemList,
                    itemName,
                    itemNumber,
                    itemCategory,
                    itemPriority
                ) :
                regiKorekauItem(
                    itemName,
                    itemNumber,
                    itemCategory,
                    itemPriority
                );
            setItemName('');
            setItemNumber(1);
            setItemPriority(false);
        }}>
            <div className="formBlock">
                <p className="formLabel">カテゴリー</p>
                <select name="korekauCategories" id="korekauCategories" defaultValue={defaultItemCategoty} onChange={(e: ChangeEvent<HTMLSelectElement>) => setItemCategory(e.target.value)}>
                    <option value="food_drink">食料品</option>
                    <option value="utils">日用品</option>
                    <option value="family">家族（親・子ども・ペット）</option>
                    <option value="myself">自分</option>
                    <option value="others">その他</option>
                </select>
            </div>
            <div className="formBlock">
                <p className="formLabel">買うもの</p>
                <input type="text" value={itemName} onInput={(e: ChangeEvent<HTMLInputElement>) => setItemName((_prevItemName) => e.target.value)} />
            </div>
            <div className="flexBox">
                <div className="formBlock">
                    <p className="formLabel">個数</p>
                    <input type="number" min={1} max={99} value={itemNumber} onInput={(e: ChangeEvent<HTMLInputElement>) => handleInputItemNumber(e.target.max, e.target.value)} />
                </div>
                <div className="formBlock">
                    <p className="formLabel">緊急度</p>
                    <label className={`switch ${itemPriority && 'switchOn'}`}>
                        <input type="checkbox" defaultChecked={itemPriority} onChange={() => setItemPriority(!itemPriority)} />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
            <input type="submit" disabled={itemName.length <= 0} value={KorekauItemList ? '再登録' : '登録'} />
        </KorekauFormElm>
    );
});

const KorekauFormElm = styled.form`
width: 95%;
border-radius: 4px;
padding: 1.5em;
box-shadow: 0 0 8px rgba(160, 160, 160, .5) inset;
margin: .5em 5% 5em 0;
background-color: #fff;

    & select,
    & input {
        font-size: 16px;
        line-height: 2;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #c6c6c6;
    }

    & input {
        padding-left: .5em;

        &[type="number"] {
            width: auto;
        }

        &[type="submit"] {
            display: block;
            width: 100%;
            background-color: #f0b20e;
            letter-spacing: 0.5em;
            transition: all .25s;
            
            &[disabled]{
                color: #999;
                background-color: #dadada; 
            }
            
            &:not([disabled]):hover {
                cursor: pointer;
                color: #f0b20e;
                border-color: #f0b20e;
                background-color: #fff;
            }
        }
    }

    & .flexBox {
        display: flex;
        align-items: flex-start;
        gap: 5em;
    }

    & .formBlock {
        margin-bottom: 2em;
        
        & p.formLabel {
            line-height: 2;
            border-left: 4px solid #f0b20e;
            padding-left: .5em;
            margin-bottom: .5em;
        }

        & .switch {
            font-size: 13px;
            position: relative;
            display: inline-block;
            width: 54px;
            height: 28px;

            &.switchOn {
                & input {
                    & + .slider {
                        background-color: #5fdd54;
                        border: 1px solid transparent;

                        &::before {
                            transform: translateX(2em);
                        }
                    }
                }
            }

            & input {
                opacity: 1;
                width: 0;
                height: 0;
            }

            & .slider {
                position: absolute;
                cursor: pointer;
                margin: auto;
                inset: 0;
                background: #fff;
                transition: all .25s;
                border-radius: 30px;
                border: 1px solid #ccc;

                &::before {
                    position: absolute;
                    content: "";
                    height: 1.9em;
                    width: 1.9em;
                    border-radius: 16px;
                    left: 1.2px;
                    top: 0;
                    bottom: 0;
                    background-color: white;
                    box-shadow: 0 2px 5px #999999;
                    transition: all .25s;
                }
            }
        }
    }
`;