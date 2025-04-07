import { memo } from "react";
import { ExportJsonData } from "./ExportJsonData";
import { ImportJsonData } from "./ImportJsonData";

export const CtrlJsonDatas = memo(({ both }: { both?: boolean }) => {
    return (
        <div className="flex flex-row flex-wrap gap-[2em] shadow-[0_0_8px_rgba(160,160,160,.5)_inset] p-[1em] my-[2.5em] mx-auto rounded">
            {both && <ExportJsonData />}
            <ImportJsonData />
        </div>
    );
});