import { memo } from "react";
import { useAtom } from "jotai";
import { korekauAtom } from "../../ts/korekau-atom";
import { KorekauForm } from "./utils/KorekauForm";
import { KorekauItems } from "./utils/KorekauItems";
import { KorekauAllReset } from "./utils/KorekauAllReset";

export const KorekauBased = memo(() => {
    const [korekauLists] = useAtom(korekauAtom);

    return (
        <>
            <KorekauForm />
            {korekauLists.length > 0 ?
                <>
                    <KorekauAllReset />
                    <KorekauItems category="food_drink" />
                    <KorekauItems category="utils" />
                    <KorekauItems category="family" />
                    <KorekauItems category="myself" />
                    <KorekauItems category="others" />
                </> :
                <p style={{ 'textAlign': 'center' }}>買うものリストには現在何も登録されていません。</p>
            }
        </>
    );
});