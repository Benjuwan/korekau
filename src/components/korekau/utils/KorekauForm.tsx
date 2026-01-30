import { ChangeEvent, SyntheticEvent, memo, useState } from "react";
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
        uuid: KorekauItemList ? KorekauItemList.uuid : '001', // uuid の既存値設定は必須
        itemName: '',
        itemNumber: '',
        itemCategory: KorekauItemList ? KorekauItemList.itemCategory : 'food_drink',
        itemPriority: KorekauItemList ? KorekauItemList.itemPriority : false,
        itemMemo: '',
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

        if (KorekauItemList) {
            updateKorekauItems(korekauItem);
            targetElsRemoveClass('editerView', 'OnView');
        } else {
            regiKorekauItem(korekauItem);
            korekauFormClosed();
        }

        setKorekauItem(initKorekauItem);
        setTimeout(() => scrollTop()); // input[type="submit"]のクリックイベントでスクロールトップしないので回避策として疑似的な遅延処理
    }

    return (
        <form action="" className="w-full rounded p-[1.5em] shadow-[0_0_8px_rgba(160,160,160,.5)_inset] my-[1em] mx-auto bg-white h-screen overflow-y-auto" onSubmit={handleFormSubmit}>
            <div className="mb-[2em]">
                <label className="leading-loose border-l-4 border-l-[#f0b20e] pl-[.5em] mb-[.5em]">カテゴリー</label>
                <select
                    name="itemCategory"
                    id="itemCategory"
                    className="text-[1rem] leading-loose w-full rounded border border-[#c6c6c6]"
                    value={korekauItem.itemCategory}
                    onChange={
                        (e: ChangeEvent<HTMLSelectElement>) => handleFormEntries<korekauItemsType>(e, korekauItem, setKorekauItem, 'korekau')
                    }>
                    <option value="food_drink">食料品</option>
                    <option value="utils">日用品</option>
                    <option value="family">家族（親・子ども・ペット）</option>
                    <option value="myself">自分</option>
                    <option value="others">その他</option>
                </select>
            </div>
            <div className="mb-[2em]">
                <label className="leading-loose border-l-4 border-l-[#f0b20e] pl-[.5em] mb-[.5em]">買うもの</label>
                <input type="text"
                    id="itemName"
                    className="text-[1rem] leading-loose w-full rounded border border-[#c6c6c6] pl-[.5em]"
                    value={korekauItem.itemName}
                    placeholder={KorekauItemList && `現在の内容：${KorekauItemList.itemName}`}
                    onInput={
                        (e: SyntheticEvent<HTMLInputElement>) => handleFormEntries<korekauItemsType>(e, korekauItem, setKorekauItem, 'korekau')
                    } />
                <div className="UploadImgItem mt-[1em]">
                    <label className="leading-loose border-l-4 border-l-[#f0b20e] pl-[.5em] mb-[.5em]">商品画像（※1MB以下）</label>
                    <UploadImgItem props={{
                        korekauItem: korekauItem,
                        setKorekauItem: setKorekauItem,
                        KorekauItemList: KorekauItemList
                    }} />
                </div>
            </div>
            <div className="mb-[2em]">
                <label className="leading-loose border-l-4 border-l-[#f0b20e] pl-[.5em] mb-[.5em]">メモ</label>
                <textarea name="itemMemo"
                    rows={5}
                    id="itemMemo"
                    className="text-[1rem] leading-loose w-full rounded border border-[#c6c6c6] pl-[.5em] placeholder:text-[#c2c2c2]"
                    value={korekauItem.itemMemo}
                    placeholder={KorekauItemList ? `現在の内容：${KorekauItemList.itemMemo}` : "例：最近の底値148円近辺なら買う"}
                    onInput={
                        (e: SyntheticEvent<HTMLTextAreaElement>) => handleFormEntries<korekauItemsType>(e, korekauItem, setKorekauItem, 'korekau')
                    }>
                </textarea>
            </div>
            <div className="flex items-start gap-[5em]">
                <div className="mb-[2em]">
                    <label className="leading-loose border-l-4 border-l-[#f0b20e] pl-[.5em] mb-[.5em]">個数</label>
                    {/* pattern="\d*"：\dは任意の数字を表し、*は0回以上の繰り返しを意味する（＝入力されるテキストが0個以上の数字で構成されることを許可）*/}
                    <input type="text"
                        id="itemNumber"
                        className="text-[1rem] leading-loose w-full rounded border border-[#c6c6c6] pl-[.5em]"
                        inputMode="numeric"
                        pattern="\d*"
                        value={korekauItem.itemNumber}
                        placeholder={KorekauItemList && `現在の内容：${KorekauItemList.itemNumber}`}
                        onInput={
                            (e: SyntheticEvent<HTMLInputElement>) => handleFormEntries<korekauItemsType>(e, korekauItem, setKorekauItem, 'korekau')
                        } />
                </div>
                <div className="mb-[2em] w-[50%]">
                    {/* トグルボタンのスタイル及び機能の都合上ここは<p> */}
                    <p className="leading-loose border-l-4 border-l-[#f0b20e] pl-[.5em] mb-[.5em]">すぐ買う</p>
                    <label className={`switch text-[0.8125rem] relative inline-block w-13.5 h-7 ${korekauItem.itemPriority && 'switchOn'}`}>
                        <input type="checkbox"
                            id="itemPriority"
                            className="text-[1rem] leading-loose opacity-[1] w-0 h-0 rounded border border-[#c6c6c6] pl-[.5em]"
                            onChange={
                                (e: SyntheticEvent<HTMLInputElement>) => handleFormEntries<korekauItemsType>(e, korekauItem, setKorekauItem, 'korekau')
                            } />
                        <span className="slider absolute cursor-pointer m-auto inset-0 bg-white transition duration-[.25s] rounded-4xl border border-[#cccccc] before:content-[''] before:absolute before:w-[1.9em] before:h-[1.9em] before:rounded-2xl before:left-px before:top-0 before:bottom-0 before:bg-white before:shadow-[0_2px_5px_#999999] before:transition before:duration-[.25s]">&nbsp;</span>
                    </label>
                </div>
            </div>
            <div className={KorekauItemList ? 'flex items-start gap-[5em]' : undefined}>
                <input type="submit"
                    className={`text-[1rem] leading-loose rounded border border-[#c6c6c6] block bg-[#f0b20e] tracking-[0.5em] transition duration-[.25s] disabled:text-[#999] disabled:bg-[#dadada] not-disabled:hover:cursor-pointer not-disabled:hover:text-[#f0b20e] not-disabled:hover:border-[#f0b20e] not-disabled:hover:bg-white ${KorekauItemList ? 'w-[80%]' : 'w-full'}`}
                    value={KorekauItemList ? '再登録' : '登録'}
                    disabled={korekauItem.itemName.length === 0 || Number(korekauItem.itemNumber) === 0} />
                {KorekauItemList &&
                    <input type="button"
                        className="editerCloseBtn block w-[20%] bg-[#5fdd54] cursor-pointer text-[1rem] text-white leading-loose rounded border border-[#c6c6c6] transition duration-[.25s] hover:text-[#5fdd54] hover:border-[#5fdd54] hover:bg-white"
                        value={'戻る'}
                        onClick={() => targetElsRemoveClass('editerView', 'OnView')} />
                }
            </div>
        </form>
    );
});