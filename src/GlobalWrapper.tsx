import { memo } from "react";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { ContentViewer } from "./utils/ContentViewer";

export const GlobalWrapper = memo(() => {
    return (
        <>
            <Header />
            <main className="w-[clamp(20rem,100%,60rem)] mx-auto px-[1em]">
                <ContentViewer />
            </main>
            <Footer />
        </>
    );
});