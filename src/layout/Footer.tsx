import styled from "styled-components";
import { memo, useEffect, useState } from "react";

export const Footer = memo(() => {
    const [currYear, setCurrYear] = useState<number>(0);
    useEffect(() => {
        const currYear: number = new Date().getFullYear();
        setCurrYear((_prevCurryear) => currYear);
    }, []);

    return (
        <FooterElm>
            <p>&copy; {currYear} KoreKau benjuwan</p>
        </FooterElm>
    );
});

const FooterElm = styled.footer`
text-align: center;
line-height: 2;

    & p {
        font-size: 1.2rem;
    }

@media screen and (min-width: 1025px) {
    & p {
        font-size: 12px;
    }
}
`