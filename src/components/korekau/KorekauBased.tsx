import { memo } from "react";
import { useAtom } from "jotai";
import { korekauAtom } from "../../ts/korekau-atom";
import { KorekauForm } from "./utils/KorekauForm";
import { KorekauItems } from "./utils/KorekauItems";

export const KorekauBased = memo(() => {
    const [korekauLists] = useAtom(korekauAtom);

    return (
        <>
            <KorekauForm />
            {korekauLists.length > 0 &&
                <>
                    <KorekauItems category="food_drink" />
                    <KorekauItems category="utils" />
                    <KorekauItems category="family" />
                    <KorekauItems category="others" />
                </>
            }
        </>
    );
});