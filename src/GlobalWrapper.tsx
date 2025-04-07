import { memo } from "react";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { SwiperLibs } from "./libs/SwiperLibs";

export const GlobalWrapper = memo(() => {
    return (
        <>
            <Header />
            <main className="w-[clamp(1.875rem,100%,3.75rem)] mt-[2.5em] mx-auto lg:w-[clamp(300px,100%,960px)]">
                <SwiperLibs />
            </main>
            <Footer />
        </>
    );
});