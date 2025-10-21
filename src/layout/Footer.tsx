import { memo, useEffect, useState } from "react";

export const Footer = memo(() => {
    const [currYear, setCurrYear] = useState<number>(0);
    useEffect(() => {
        const currYear: number = new Date().getFullYear();
        setCurrYear(currYear);
    }, []);

    return (
        <footer className="text-center leading-loose">
            <p className="text-[0.75rem]">&copy; {currYear} KoreKau benjuwan</p>
        </footer>
    );
});