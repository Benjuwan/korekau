import { memo } from "react";

import rogo from "../assets/rogo.svg";

export const Introduction = memo(() => {
    return (
        <section className="px-[1em] leading-[2] text-[1rem]">
            <h2 className="mb-[2.5em]"><figure className="rogoThumbnail text-center my-[1em]"><img className="w-[clamp(15rem,100%,25rem)] m-auto" src={rogo} alt="KoreKau（シンプルな買い物リスト管理アプリ）のロゴ" /></figure></h2>
            <p>KoreKau（コレカウ）は、シンプルな買い物リスト管理アプリです。買うものリストの管理（追加・編集）に加えて、家事に関するちょっとしたフォローができるよう「商品価格の比較」や「簡易なスケジュール管理」、「ゴミ出し前日のお知らせ表示」などが行えるようになっています。KoreKau（コレカウ）を日常的に使っていただくことで少しでも家事の負担を軽減できれば幸いです。</p>
            <p>画面上部の［ツールバー］から［項目］を選択（タップ）またはスワイプで当該項目を表示して各機能を利用いただけます。</p>
            <div className="my-[2.5em] p-[1em] bg-[#ffe2e0] shadow-[0_0_8px_rgba(160,160,160,.5)_inset] rounded">
                <p className="flex items-center border-b border-b-[#333] pb-[.5em] mb-[.5em]"><span className="material-symbols-outlined text-[#cc3226] mr-[.25em]">error</span>注意事項</p>
                <p>KoreKau（コレカウ） は localStorage という技術を用いてユーザーのデバイス（で使用しているブラウザ：Safari, Chrome など）に情報を保存しています。仕様上、セキュリティリスクが生じる可能性がありますので、<b className="text-[#cc3226]">個人情報やパスワードをはじめ、家族や他人のセンシティブ情報は絶対に登録しない</b>でください。</p>
                <p>localStorage の仕様上、1週間ほど（アクセスせずに）過ぎると登録内容はリセット（全削除）されます。登録してから1週間経っても買わないならそれは不要なものだったと捉えて「要らないものを買わずに済んで節約になったね♪」と前向きに考えて（やって）ください。</p>
            </div>
            <div className="my-[2.5em] p-[1em] bg-[#d2e4fc] shadow-[0_0_8px_rgba(160,160,160,.5)_inset] rounded">
                <p className="flex items-center border-b border-b-[#333] pb-[.5em] mb-[.5em]"><span className="material-symbols-outlined text-[#1d6cd4] mr-[.25em]">error</span>プライベートモード以外でご利用ください</p>
                <p>プライベート（ブラウザの閲覧履歴を残さない）モードでは仕様上機能しません（登録情報を保存できません）。</p>
            </div>
            <section>
                <h3 className="text-center px-[.5em] w-fit my-[5em] mx-auto border-b border-b-[#999] relative text-[1.25rem] before:content-[''] before:w-[25%] before:h-[1px] before:bg-[#999] before:absolute before:top-[120%] before:left-[50%] before:transform-[translateX(-50%)] lg:text-[32px]">コレカウでできること</h3>
                <dl className="lg:flex lg:flex-row lg:flex-wrap lg:gap-[5%]">
                    <div className="mb-[5em] lg:w-[47.5%]">
                        <dt className="text-[1.5rem]"><h4 className="text-[#f0b20e] border-l-[#f0b20e] border-l-[.25rem] pl-[.5em] mb-[.5em]">1. 買うものリスト</h4></dt>
                        <dd>
                            <div className="bg-[#f5f5f5] rounded p-[1em] mb-[2.5em]">
                                <h5 className="font-bold border-b border-b-[#dadada] pb-[.5em] mb-[.5em]">買うものを管理（追加・編集）</h5>
                                <p className="mb-[.5em]">［▶買うものを新たに登録する］を押して（タップして）表示される登録フォームからリストを更新できます。</p>
                                <p>登録商品ラベルの右端にある［編集（緑のペンアイコン）］及び［削除（赤のゴミ箱アイコン）］から随時変更・更新が行えます。</p>
                            </div>
                            <div className="bg-[#f5f5f5] rounded p-[1em] mb-[2.5em]">
                                <h5 className="font-bold border-b border-b-[#dadada] pb-[.5em] mb-[.5em]">リストを共有</h5>
                                <ul>
                                    <li className="mb-[1em]">
                                        <p className="font-bold mb-[.5em]">書き出し：自分のリストを他人に共有する</p>
                                        <p>すでに自分のリストがある状態でページ下部にある［リストを書き出す］を押すと、リストファイル（korekauitems.json）がデバイスのダウンロードフォルダへ保存されます。そのリストファイルを共有したい方へ送ってください</p>
                                    </li>
                                    <li>
                                        <p className="font-bold mb-[.5em]">読み込み：他人のリストを自分に反映する</p>
                                        <p>［買うものリストの読み込み］下にある［ファイルを選択］を押して、共有されたリストファイル（korekauitems.json）を選択するとリストが反映されます。</p>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </div>
                    <div className="mb-[5em] lg:w-[47.5%]">
                        <dt className="text-[1.5rem]"><h4 className="text-[#f0b20e] border-l-[#f0b20e] border-l-[.25rem] pl-[.5em] mb-[.5em]">2. 商品価格の比較</h4></dt>
                        <dd>
                            <div className="bg-[#f5f5f5] rounded p-[1em] mb-[2.5em]">
                                <h5 className="font-bold border-b border-b-[#dadada] pb-[.5em] mb-[.5em]">どれがコスパの良い商品かチェック</h5>
                                <p className="mb-[.5em]">［容量・個数］に対象商品の単位を、［価格］に当該商品の価格を入力して［計算］を押すと結果が下部に表示されます。</p>
                                <p>例えば、洗剤を買おうとして通常版と大容量お得版の比較を行うとします。【通常版：468g / 98円】と【大容量お得版：789g / 186円】では、どちらが本当にコスパが良いかを把握できます。</p>
                            </div>
                        </dd>
                    </div>
                    <div className="mb-[5em] lg:w-[47.5%]">
                        <dt className="text-[1.5rem]"><h4 className="text-[#f0b20e] border-l-[#f0b20e] border-l-[.25rem] pl-[.5em] mb-[.5em]">3. カレンダー</h4></dt>
                        <dd>
                            <div className="bg-[#f5f5f5] rounded p-[1em] mb-[2.5em]">
                                <h5 className="font-bold border-b border-b-[#dadada] pb-[.5em] mb-[.5em]">簡易なスケジュール管理</h5>
                                <p>各日付にある［+アイコン］を押して表示される登録フォームから当該日のスケジュール（予定内容と開始・終了時間）を設定できます。</p>
                            </div>
                        </dd>
                    </div>
                    <div className="mb-[5em] lg:flex lg:flex-row lg:flex-wrap lg:gap-[5%] lg:w-[47.5%]">
                        <dt className="text-[1.5rem]"><h4 className="text-[#f0b20e] border-l-[#f0b20e] border-l-[.25rem] pl-[.5em] mb-[.5em]">4. ゴミ出し日</h4></dt>
                        <dd>
                            <div className="bg-[#f5f5f5] rounded p-[1em] mb-[2.5em]">
                                <h5 className="font-bold border-b border-b-[#dadada] pb-[.5em] mb-[.5em]">設定したゴミ出し日の前日を表示</h5>
                                <p>自治体や地域によっては家庭ごみを出せる曜日とゴミの種別が決まっているところもあります。【曜日】と【ゴミの種別】を設定することで、その前日にコレカウ画面上部に表示が出てきます。</p>
                            </div>
                        </dd>
                    </div>
                </dl>
            </section>
        </section>
    );
});