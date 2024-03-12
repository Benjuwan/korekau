import styled from "styled-components";
import { memo } from "react";

import rogo from "../assets/rogo.svg";

export const Introduction = memo(() => {
    return (
        <IntroductionWrapper>
            <h2><figure className="rogoThumbnail"><img src={rogo} alt="KoreKau（シンプルな買い物リスト管理アプリ）のロゴ" /></figure></h2>
            <p>KoreKau（コレカウ）は、シンプルな買い物リスト管理アプリです。買うものリストの作成・管理に加えて、家事に関するちょっとしたフォローができるよう「ゴミ出し前日のお知らせ表示」や「簡易なカレンダー」、「商品価格の比較」などが行えるようになっています。KoreKau（コレカウ）を日常的に使っていただくことで少しでも家事の負担を軽減できれば幸いです。</p>
        </IntroductionWrapper>
    );
});

const IntroductionWrapper = styled.section`
padding: 0 1em;
line-height: 2;

    & h2 {
        margin-bottom: 2.5em;
    }

    & .rogoThumbnail {
        text-align: center;
        margin: 1em 0;
        
        & img {
            width: clamp(24rem, 100%, 40rem);
        }
    }

@media screen and (min-width: 1025px) {
    font-size: 1.4rem;
    
    & .rogoThumbnail {
        & img {
            width: clamp(240px, 100%, 400px);
        }
    }
}
`;