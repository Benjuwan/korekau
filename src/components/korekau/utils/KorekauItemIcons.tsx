import { memo } from "react";

export const KorekauItemIcons = memo(({ category }: { category: string }) => {
    return (
        <figure>
            {category === 'others' && <span className="material-symbols-outlined">category</span>}
            {category === 'food_drink' && <span className="material-symbols-outlined">restaurant</span>}
            {category === 'utils' && <span className="material-symbols-outlined">household_supplies</span>}
            {category === 'family' && <span className="material-symbols-outlined">family_restroom</span>}
        </figure>
    );
});