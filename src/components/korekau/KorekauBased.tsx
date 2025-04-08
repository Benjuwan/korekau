import { memo, useEffect } from "react";
import { korekauItemsType } from "./ts/korekau";
import { useAtom } from "jotai";
import { korekauAtom } from "../../ts/korekau-atom";
import { localstorageLabel_KorekauItems } from "../../ts/korekau-localstorageLabel";
import { KorekauForm } from "./utils/KorekauForm";
import { KorekauItems } from "./utils/KorekauItems";
import { KorekauAllReset } from "./utils/KorekauAllReset";
import { CtrlJsonDatas } from "../../utils/CtrlJsonDatas";

export const KorekauBased = memo(() => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    useEffect(() => {
        /* localStorage にデータがあればその内容を子コンポーネント（KorekauItems）に渡す */
        const getLocalStorageItems: string | null = localStorage.getItem(localstorageLabelKorekauItems);
        if (getLocalStorageItems !== null) {
            const SaveLocalStorageDateItems: korekauItemsType[] = JSON.parse(getLocalStorageItems);
            setKorekauLists([...SaveLocalStorageDateItems]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="korekauSection">
            <details className="my-[2.5em] mx-auto p-[1em] bg-[#f5f5f5] rounded text-[1rem]">
                <summary>買うものを新たに登録する</summary>
                <KorekauForm />
            </details>
            {korekauLists.length > 0 ?
                <>
                    <KorekauAllReset />
                    <KorekauItems category="food_drink" />
                    <KorekauItems category="utils" />
                    <KorekauItems category="family" />
                    <KorekauItems category="myself" />
                    <KorekauItems category="others" />
                    <CtrlJsonDatas both={true} />
                </> :
                <>
                    <p className="text-center">買うものリストには現在何も登録されていません。</p>
                    <CtrlJsonDatas />
                </>
            }
        </section>
    );
});