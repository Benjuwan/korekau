# KoreKau | シンプルな買い物リスト管理アプリ
KoreKau（コレカウ）は、シンプルな買い物リスト管理アプリです。買うものリストの作成・管理に加えて、家事に関するちょっとしたフォローができるよう「ゴミ出し前日のお知らせ表示」や「簡易なカレンダー」、「商品価格の比較」などが行えるようになっています。KoreKau（コレカウ）を日常的に使っていただくことで少しでも家事の負担を軽減できれば幸いです。

サイトURL：[https://korekau.netlify.app/](https://korekau.netlify.app/)

- アイコンソース元：[Material Symbols](https://fonts.google.com/icons)

***

<img width="45%" alt="summary" src="https://github.com/Benjuwan/korekau/assets/90702379/2ec5095e-93d9-45f5-b406-8704ad472ff9">

## 技術スタック
- @tailwindcss/vite@4.1.3
- @types/react-dom@18.3.6
- @types/react@18.3.20
- @types/uuid@9.0.8
- @typescript-eslint/eslint-plugin@7.18.0
- @typescript-eslint/parser@7.18.0
- @vitejs/plugin-react@1.3.2
- eslint-plugin-react-hooks@4.6.2
- eslint-plugin-react-refresh@0.4.19
- eslint@8.57.1
- jotai@2.12.2
- react-dom@18.3.1
- react@18.3.1
- swiper@11.2.6
- tailwindcss@4.1.3
- typescript@5.8.3
- uuid@9.0.1
- vite@6.2.5

## 概要
`localStorage`を使って登録データ（買うものリスト、カレンダーのスケジュール、ゴミ出し日）の保存を行っています。<br />そのため **1週間ほど過ぎると登録内容はリセット（全削除）** されます。<br />
~~登録してから1週間経っても買わないならそれは不要なものだったと捉えて「要らないものを買わずに済んで節約になったね♪」と前向きに考えて（やって）ください。~~<br />
機能変更（画面遷移）には`Swiper`を使っていて`src/libs/SwiperLibs.tsx`で各種機能のコンポーネントを読み込んでいます。各種機能のコンポーネントは以下です。
- `src/components/compareItems`：商品価格の比較
- `src/components/korekau`：買うものリスト
- `src/components/schedule`：カレンダー
- `src/components/trash`：ゴミ出し日の設定

## KoreKau（コレカウ）でできること
- 1.買うものリスト
    - 買うものを管理（追加・編集）<br />
    `［▶買うものを新たに登録する］`を押して（タップして）表示される登録フォームからリストを更新できます。<br />
    登録商品ラベルの右端にある`［編集（緑のペンアイコン）］`及び`［削除（赤のゴミ箱アイコン）］`から随時変更・更新が行えます。

    - リストを共有
        - 書き出し：自分のリストを他人に共有する<br />
        すでに自分のリストがある状態でページ下部にある`［リストを書き出す］`を押すと、リストファイル（`korekauitems.json`）がデバイスのダウンロードフォルダへ保存されます。そのリストファイルを共有したい方へ送ってください

        - 読み込み：他人のリストを自分に反映する<br />
        `［買うものリストの読み込み］`下にある`［ファイルを選択］`を押して、共有されたリストファイル（`korekauitems.json`）を選択するとリストが反映されます。

    <div style="display:flex; gap:2em;"><img width="45%" alt="korekau01" src="https://github.com/Benjuwan/korekau/assets/90702379/0454820e-0da5-4b70-8127-d229013f63d5"><img width="45%" alt="korekau02" src="https://github.com/Benjuwan/korekau/assets/90702379/e3fcacb8-2457-4965-8322-3bc36a6ce75f"></div>

***

- 2.商品価格の比較（どれがコスパの良い商品かチェック）<br />
`［容量・個数］`に対象商品の単位を、`［価格］`に当該商品の価格を入力して`［計算］`を押すと結果が下部に表示されます。<br />例えば、洗剤を買おうとして通常版と大容量お得版の比較を行うとします。【通常版：468g / 98円】と【大容量お得版：789g / 186円】では、どちらが本当にコスパが良いかを把握できます。

<img width="363" alt="compareitems01" src="https://github.com/Benjuwan/korekau/assets/90702379/5a8cd4ff-e899-4aad-b695-4fa41b1cd593">

***

- 3.カレンダー（簡易なスケジュール管理）<br />
各日付にある`［+アイコン］`を押して表示される登録フォームから当該日のスケジュール（予定内容と開始・終了時間）を設定できます。

<img width="1143" alt="calendar" src="https://github.com/Benjuwan/korekau/assets/90702379/5d038b70-fd89-4012-aa16-268b1e49d973">

***

- 4.ゴミ出し日（設定したゴミ出し日の前日を表示）<br />
自治体や地域によっては家庭ごみを出せる曜日とゴミの種別が決まっているところもあります。【曜日】と【ゴミの種別】を設定することで、その前日にコレカウ画面上部に表示が出てきます。

<img width="499" alt="trash001" src="https://github.com/Benjuwan/korekau/assets/90702379/c354d248-87ab-4514-bbe2-8dcf55fb5c61">