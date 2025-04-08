import { memo } from "react";

export const KorekauItemIcons = memo(({ category }: { category: string }) => {
    return (
        <figure>
            {category === 'food_drink' && <span className="material-symbols-outlined align-middle shadow-[0_0_8px_rgba(0,0,0,.25)_inset] aspect-square rounded-full p-[.25em]">restaurant</span>}
            {category === 'utils' && <span className="material-symbols-outlined align-middle shadow-[0_0_8px_rgba(0,0,0,.25)_inset] aspect-square rounded-full p-[.25em]">household_supplies</span>}
            {category === 'family' && <span className="material-symbols-outlined align-middle shadow-[0_0_8px_rgba(0,0,0,.25)_inset] aspect-square rounded-full p-[.25em]">family_restroom</span>}
            {category === 'myself' && <span className="material-symbols-outlined align-middle shadow-[0_0_8px_rgba(0,0,0,.25)_inset] aspect-square rounded-full p-[.25em]">person</span>}
            {category === 'others' && <span className="material-symbols-outlined align-middle shadow-[0_0_8px_rgba(0,0,0,.25)_inset] aspect-square rounded-full p-[.25em]">category</span>}
        </figure>
    );
});