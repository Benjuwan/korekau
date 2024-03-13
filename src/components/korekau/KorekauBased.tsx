import { memo, useEffect } from "react";
import { korekauItemsType } from "./ts/korekau";
import { useAtom } from "jotai";
import { korekauAtom } from "../../ts/korekau-atom";
import { localstorageLabel_KorekauItems } from "../../ts/korekau-localstorageLabel";
import { KorekauForm } from "./utils/KorekauForm";
import { KorekauItems } from "./utils/KorekauItems";
import { KorekauAllReset } from "./utils/KorekauAllReset";
import { CtrlJsonDatas } from "../../utils/CtrlJsonDatas";

const formAccordionStyle: object = {
    'margin': '2.5em auto',
    'padding': '1em',
    'backgroundColor': '#f5f5f5',
    'borderRadius': '4px',
    'fontSize': '16px'
}

export const KorekauBased = memo(() => {
    const [korekauLists, setKorekauLists] = useAtom(korekauAtom);

    const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

    useEffect(() => {
        /* localStorage にデータがあればその内容を子コンポーネント（KorekauItems）に渡す */
        const getLocalStorageItems: string | null = localStorage.getItem(localstorageLabelKorekauItems);
        if (getLocalStorageItems !== null) {
            const SaveLocalStorageDateItems: korekauItemsType[] = JSON.parse(getLocalStorageItems);
            setKorekauLists((_prevKorekauLists) => [...SaveLocalStorageDateItems]);
        }
    }, []);

    return (
        <section>
            <details style={formAccordionStyle}>
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
                    <p style={{ 'textAlign': 'center' }}>買うものリストには現在何も登録されていません。</p>
                    <CtrlJsonDatas />
                </>
            }
        </section>
    );
});