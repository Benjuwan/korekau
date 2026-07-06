import { memo } from "react";
import { TrashForm } from "./utils/TrashForm";
import { TrashDataItems } from "./utils/TrashDataItems";

export const TrashBased = memo(() => {
    return (
        <section>
            <TrashForm />
            <TrashDataItems />
        </section>
    );
});