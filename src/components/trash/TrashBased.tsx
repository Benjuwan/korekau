import { memo } from "react";
import { useAtom } from "jotai";
import { trashDateAtom } from "../../ts/trash-atom";
import { TrashForm } from "./utils/TrashForm";
import { TrashDateLists } from "./utils/TrashDateLists";

export const TrashBased = memo(() => {
    const [trashDateLists] = useAtom(trashDateAtom);

    return (
        <>
            <TrashForm />
            {trashDateLists.length > 0 &&
                <TrashDateLists />
            }
        </>
    );
});