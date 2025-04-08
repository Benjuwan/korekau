import { memo } from "react";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { SwiperLibs } from "./libs/SwiperLibs";

export const GlobalWrapper = memo(() => {
    return (
        <>
            <Header />
            <main className="w-[clamp(20rem,100%,60rem)] mt-[2.5em] mx-auto">
                <SwiperLibs />
            </main>
            <Footer />
        </>
    );
});