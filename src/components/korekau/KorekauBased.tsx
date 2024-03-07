import { memo, useEffect } from "react";
import { useAtom } from "jotai";
import { korekauAtom } from "../../ts/korekau-atom";
import { localstorageLabel_KorekauItems } from "../../ts/korekau-localstorageLabel";
import { KorekauForm } from "./utils/KorekauForm";
import { KorekauItems } from "./utils/KorekauItems";
import { KorekauAllReset } from "./utils/KorekauAllReset";
import { korekauItemsType } from "./ts/korekau";

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
        <>
            <KorekauForm />
            {korekauLists.length > 0 ?
                <>
                    <KorekauAllReset />
                    <KorekauItems props={{
                        korekauLists: korekauLists,
                        category: "food_drink"
                    }} />
                    <KorekauItems props={{
                        korekauLists: korekauLists,
                        category: "utils"
                    }} />
                    <KorekauItems props={{
                        korekauLists: korekauLists,
                        category: "family"
                    }} />
                    <KorekauItems props={{
                        korekauLists: korekauLists,
                        category: "myself"
                    }} />
                    <KorekauItems props={{
                        korekauLists: korekauLists,
                        category: "others"
                    }} />
                </> :
                <p style={{ 'textAlign': 'center' }}>買うものリストには現在何も登録されていません。</p>
            }
        </>
    );
});