import styled from "styled-components";
import { memo } from "react";

import rogo from "../assets/rogo.svg";

export const Introduction = memo(() => {
    return (
        <IntroductionWrapper>
            <h2><figure className="rogoThumbnail"><img src={rogo} alt="KoreKau（シンプルな買い物リスト管理アプリ）のロゴ" /></figure></h2>
            <p>KoreKau（コレカウ）は、シンプルな買い物リスト管理アプリです。買うものリストの管理（追加・編集）に加えて、家事に関するちょっとしたフォローができるよう「商品価格の比較」や「簡易なスケジュール管理」、「ゴミ出し前日のお知らせ表示」などが行えるようになっています。KoreKau（コレカウ）を日常的に使っていただくことで少しでも家事の負担を軽減できれば幸いです。</p>
            <p>画面上部の［ツールバー］から［項目］を選択（タップ）またはスワイプで当該項目を表示して各機能を利用いただけます。</p>
            <div className="caution">
                <p><span className="material-symbols-outlined">error</span>注意事項</p>
                <p>KoreKau（コレカウ） は localStorage という技術を用いてユーザーのデバイス（で使用しているブラウザ：Safari, Chrome など）に情報を保存しています。仕様上、セキュリティリスクが生じる可能性がありますので、<b>個人情報やパスワードをはじめ、家族や他人のセンシティブ情報は絶対に登録しない</b>でください。</p>
            </div>
            <section>
                <h3>コレカウでできること</h3>
                <dl>
                    <div className="desParent">
                        <dt><h4>1. 買うものリスト</h4></dt>
                        <dd>
                            <div className="desChildren">
                                <h5>買うものを管理（追加・編集）</h5>
                                <p>［▶買うものを新たに登録する］を押して（タップして）表示される登録フォームからリストを更新できます。</p>
                                <p>登録商品ラベルの右端にある［編集（緑のペンアイコン）］及び［削除（赤のゴミ箱アイコン）］から随時変更・更新が行えます。</p>
                            </div>
                            <div className="desChildren">
                                <h5>リストを共有</h5>
                                <ul>
                                    <li>
                                        <p>書き出し：自分のリストを他人に共有する</p>
                                        <p>すでに自分のリストがある状態でページ下部にある［リストを書き出す］を押すと、リストファイル（korekauitems.json）がデバイスのダウンロードフォルダへ保存されます。そのリストファイルを共有したい方へ送ってください</p>
                                    </li>
                                    <li>
                                        <p>読み込み：他人のリストを自分に反映する</p>
                                        <p>［買うものリストの読み込み］下にある［ファイルを選択］を押して、共有されたリストファイル（korekauitems.json）を選択するとリストが反映されます。</p>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </div>
                    <div className="desParent">
                        <dt><h4>2. 商品価格の比較</h4></dt>
                        <dd>
                            <div className="desChildren">
                                <h5>どれがコスパの良い商品かチェック</h5>
                                <p>［容量・個数］に対象商品の単位を、［価格］に当該商品の価格を入力して［計算］を押すと結果が下部に表示されます。</p>
                                <p>例えば、洗剤を買おうとして通常版と大容量お得版の比較を行うとします。【通常版：468g / 98円】と【大容量お得版：789g / 186円】では、どちらが本当にコスパが良いかを把握できます。</p>
                            </div>
                        </dd>
                    </div>
                    <div className="desParent">
                        <dt><h4>3. カレンダー</h4></dt>
                        <dd>
                            <div className="desChildren">
                                <h5>簡易なスケジュール管理</h5>
                                <p>各日付にある［+アイコン］を押して表示される登録フォームから当該日のスケジュール（予定内容と開始・終了時間）を設定できます。</p>
                            </div>
                        </dd>
                    </div>
                    <div className="desParent">
                        <dt><h4>4. ゴミ出し日</h4></dt>
                        <dd>
                            <div className="desChildren">
                                <h5>設定したゴミ出し日の前日を表示</h5>
                                <p>自治体や地域によっては家庭ごみを出せる曜日とゴミの種別が決まっているところもあります。【曜日】と【ゴミの種別】を設定することで、その前日にコレカウ画面上部に表示が出てきます。</p>
                            </div>
                        </dd>
                    </div>
                </dl>
            </section>
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

    & .caution {
        margin: 2.5em 0;
        padding: 1em;
        box-shadow: 0 0 8px rgba(160, 160, 160, .5) inset;
        background-color: #ffe2e0;
        border-radius: .4rem;

        & p {
            &:first-of-type {
                display: flex;
                align-items: center;
                border-bottom: 1px solid #333;
                padding-bottom: .5em;
                margin-bottom: .5em;

                & .material-symbols-outlined {
                    margin-right: .25em;
                    color: #cc3226;
                }
            }

            & b {
                color: #cc3226;
            }
        }
    }

    & h3 {
        text-align: center;
        padding: 0 .5em;
        width: fit-content;
        margin: 5em auto;
        font-weight: normal;
        border-bottom: 1px solid #999;
        position: relative;
        font-size: 2rem;

        &::before {
            content: "";
            width: 25%;
            height: 1px;
            background-color: #999;
            position: absolute;
            top: 120%;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    & dl {
        & div {
            & h5 {
                border-bottom: 1px solid #dadada;
                padding-bottom: .5em;
                margin-bottom: .5em;
            }

            & ul {
                list-style: none;

                & li {
                    &:not(:last-of-type) {
                        margin-bottom: 1em;
                    }

                    & p {
                        &:first-of-type {
                            font-weight: bold;
                        }
                    }
                }
            }

            & p {
                margin-bottom: .5em;
            }
        }

        & dt {
            font-size: 2rem;

            & h4 {
                font-weight: normal;
                color: #f0b20e;
                border-left: 4px solid #f0b20e;
                padding-left: .5em;
                margin-bottom: .5em;
            }
        }

        & .desParent {
            margin-bottom: 5em;
        }

        & .desChildren {
            background-color: #f5f5f5;
            border-radius: .4rem;
            padding: 1em;
            margin-bottom: 2.5em;
        }
    }

@media screen and (min-width: 1025px) {
    font-size: 16px;
    
    & .rogoThumbnail {
        & img {
            width: clamp(240px, 100%, 400px);
        }
    }

    & .caution {
        border-radius: 4px;
    }

    & h3 {
        font-size: 32px;
    }

    & dl {
        display: flex;
        flex-flow: row wrap;
        gap: 5%;

        & .desParent {
            width: 47.5%;
        }

        & dt {
            font-size: 24px;
        }

        & .desChildren {
            border-radius: 4px;
        }
    }
}
`;