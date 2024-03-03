import { memo } from "react";
import { NavigationBar } from "../../utils/NavigationBar";

export const KorekauBased = memo(() => {
    return (
        <>
            <NavigationBar classNameStr="korekau" />
            <p>hoge</p>
        </>
    );
});