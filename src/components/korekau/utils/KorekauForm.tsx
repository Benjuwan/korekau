import styled from "styled-components";
import { ChangeEvent, memo, useState } from "react";
import { korekauItemsType } from "../ts/korekau";
import { UploadImgItem } from "../../../utils/UploadImgItem";
import { useRegiKorekauItem } from "../hooks/useRegiKorekauItem";
import { useUpdateKorekauItems } from "../hooks/useUpdateKorekauItems";
import { useHandleFormEntries } from "../../../hooks/useHandleFormEntries";
import { useTargetElsRemoveClass } from "../../../hooks/useTargetElsRemoveClass";
import { useKorekauFormClosed } from "../hooks/useKorekauFormClosed";
import { useScrollTop } from "../../../hooks/useScrollTop";

export const KorekauForm = memo(({ KorekauItemList }: { KorekauItemList?: korekauItemsType }) => {
    const initKorekauItem: korekauItemsType = {
        uuid: KorekauItemList ? KorekauItemList.uuid : '001',
        itemName: KorekauItemList ? KorekauItemList.itemName : '',
        itemNumber: KorekauItemList ? KorekauItemList.itemNumber : '',
        itemCategory: KorekauItemList ? KorekauItemList.itemCategory : 'food_drink',
        itemPriority: KorekauItemList ? KorekauItemList.itemPriority : false,
        itemMemo: KorekauItemList ? KorekauItemList.itemMemo : '',
        itemImg: KorekauItemList ? KorekauItemList.itemImg : ''
    }
    const [korekauItem, setKorekauItem] = useState<korekauItemsType>(initKorekauItem);

    const { regiKorekauItem } = useRegiKorekauItem();
    const { updateKorekauItems } = useUpdateKorekauItems();
    const { targetElsRemoveClass } = useTargetElsRemoveClass();
    const { handleFormEntries } = useHandleFormEntries();
    const { scrollTop } = useScrollTop();
    const { korekauFormClosed } = useKorekauFormClosed();

    const handleFormSubmit: (formElm: ChangeEvent<HTMLFormElement>) => void = (formElm: ChangeEvent<HTMLFormElement>) => {
        formElm.preventDefault();
        KorekauItemList ?
            (
                updateKorekauItems(korekauItem),
                targetElsRemoveClass('editerView', 'OnView')
            ) :
            (
                regiKorekauItem(korekauItem),
                korekauFormClosed()
            )
        setKorekauItem((_prevKorekauitem) => initKorekauItem);
        setTimeout(() => scrollTop()); // input[type="submit"]のクリックイベントでスクロールトップしないので回避策として疑似的な遅延処理
    }

    return (
        <KorekauFormElm action="" onSubmit={handleFormSubmit}>
            <div className="formBlock">
                <label className="formLabel">カテゴリー</label>
                <select name="itemCategory" id="itemCategory" value={korekauItem.itemCategory} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFormEntries<korekauItemsType>(e, korekauItem, setKorekauItem, 'korekau')}>
                    <option value="food_drink">食料品</option>
                    <option value="utils">日用品</option>
                    <option value="family">家族（親・子ども・ペット）</option>
                    <option value="myself">自分</option>
                    <option value="others">その他</option>
                </select>
            </div>
            <div className="formBlock">
                <label className="formLabel">買うもの</label>
                <input type="text" id="itemName" value={korekauItem.itemName} onInput={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<korekauItemsType>(e, korekauItem, setKorekauItem, 'korekau')} />
                <div className="UploadImgItem">
                    <label className="formLabel">商品画像（※1MB以下）</label>
                    <UploadImgItem props={{
                        korekauItem: korekauItem,
                        setKorekauItem: setKorekauItem
                    }} />
                </div>
            </div>
            <div className="formBlock">
                <label className="formLabel">メモ</label>
                <textarea name="itemMemo" id="itemMemo" rows={5} value={korekauItem.itemMemo} onInput={(e: ChangeEvent<HTMLTextAreaElement>) => handleFormEntries<korekauItemsType>(e, korekauItem, setKorekauItem, 'korekau')} placeholder="例：最近の底値148円近辺なら買う" ></textarea>
            </div>
            <div className="formFlexBox">
                <div className="formBlock">
                    <label className="formLabel">個数</label>
                    {/* pattern="\d*"：\dは任意の数字を表し、*は0回以上の繰り返しを意味する（＝入力されるテキストが0個以上の数字で構成されることを許可）*/}
                    <input type="text" id="itemNumber" inputMode="numeric" pattern="\d*" value={korekauItem.itemNumber} onInput={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<korekauItemsType>(e, korekauItem, setKorekauItem, 'korekau')} />
                </div>
                <div className="formBlock">
                    {/* トグルボタンのスタイル及び機能の都合上ここは<p> */}
                    <p className="formLabel">すぐ買う</p>
                    <label className={`switch ${korekauItem.itemPriority && 'switchOn'}`}>
                        <input type="checkbox" id="itemPriority" onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<korekauItemsType>(e, korekauItem, setKorekauItem, 'korekau')} />
                        <span className="slider">&nbsp;</span>
                    </label>
                </div>
            </div>
            <div className={KorekauItemList ? 'formFlexBox' : undefined}>
                <input type="submit" disabled={(korekauItem.itemName.length <= 0 && Number(korekauItem.itemNumber) <= 0)} value={KorekauItemList ? '再登録' : '登録'} />
                {KorekauItemList &&
                    <input type="button" className="editerCloseBtn" onClick={() => targetElsRemoveClass('editerView', 'OnView')} value={'戻る'} />
                }
            </div>
        </KorekauFormElm>
    );
});

const KorekauFormElm = styled.form`
width: 100%;
border-radius: 4px;
padding: 1.5em;
box-shadow: 0 0 8px rgba(160, 160, 160, .5) inset;
margin: 1em auto;
background-color: #fff;

    & select,
    & input,
    & textarea {
        font-size: 16px;
        line-height: 2;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #c6c6c6;
    }

    & textarea {
    padding-left: .5em;
        &::placeholder {
            color: #c2c2c2;
        }
    }

    & input {
        padding-left: .5em;

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
    
    & .editerCloseBtn {
        display: block;
        width: 20%;
        background-color: #5fdd54;
        cursor: pointer;

        &:hover {
            color: #5fdd54;
            border-color: #5fdd54;
            background-color: #fff;
        }
    }

    & .formFlexBox {
        display: flex;
        align-items: flex-start;
        gap: 5em;

        & input {
            &[type="submit"] {
                width: 80%;
            }
        }
    }

    & .formBlock {
        margin-bottom: 2em;

        &:has(.switch){
            width: 50%;
        }
        
        & .formLabel {
            line-height: 2;
            border-left: 4px solid #f0b20e;
            padding-left: .5em;
            margin-bottom: .5em;
        }

        & .UploadImgItem {
            margin-top: 1em;

            & input {
                border: 0;
                padding: 0;
                margin-bottom: .5em;
            }
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