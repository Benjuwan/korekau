import { memo } from "react";
import { FilteredTrashDayList } from "../components/trash/utils/FilteredTrashDayList";

import rogo from "../../public/img/favi.svg";

export const Header = memo(() => {
    return (
        <header>
            <h1 className="max-w-[4rem] my-[2em] mx-auto text-center lg:max-w-[320px]">
                <figure><img className="block w-[3.2em] m-auto shadow-[0_0_8px_rgba(160,160,160,.25)_inset] rounded-full aspect-square p-[0.25em]" src={rogo} alt="KoreKauのロゴ" /></figure>
            </h1>
            <FilteredTrashDayList />
        </header>
    );
});