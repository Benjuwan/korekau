import { ChangeEvent, memo, useState } from "react";

type UploadImgItemType = {
    setItemImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

export const UploadImgItem = memo(({ props }: { props: UploadImgItemType }) => {
    const { setItemImgSrc } = props;

    const [base64ImageStr, setBase64ImageStr] = useState<string | ArrayBuffer | null>(null); // input[type="file"] でアップした画像のバイナリデータ管理用

    const [_, setFile] = useState<FileList | null>(null); // input[type="file"] のデータ
    const fileAccept: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']; // input[type="file"] で指定可能な mineType

    const fileToGenerativePart = async (file: Blob) => {
        // Blob：バイナリデータを扱うためのオブジェクトを生成する
        const base64EncodedDataPromise: Promise<string | ArrayBuffer | null> = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const readerResult: string | ArrayBuffer | null = reader.result;
                /* --------- ここから Chat=GPT を頼った部分 --------- */
                if (typeof readerResult === 'string') {
                    // もし readerResult が文字列型（Base64 エンコードされたデータ）なら Base64 データを分割して、resolve に渡す
                    resolve(readerResult.split(',')[1]);
                } else if (readerResult instanceof ArrayBuffer) {
                    // もし readerResult が ArrayBuffer 型（バイナリデータ）なら Uint8Array に変換してから Blob を作成
                    const arrayBufferView = new Uint8Array(readerResult); // Uint8Array：型付き配列で、8 ビット符号なし整数値の配列のコンストラクター
                    const blob = new Blob([arrayBufferView], { type: file.type });

                    // Blob を URL に変換して、resolve に渡す
                    const urlCreator = window.URL || window.webkitURL; // window.URL または window.webkitURL は、ブラウザ環境で Blob を URL に変換するための API を提供する
                    const imageUrl = urlCreator.createObjectURL(blob); // createObjectURL：Blob オブジェクトに一意の URL を割り当てる
                    resolve(imageUrl);
                }
                /* --------- ここまで Chat=GPT を頼った部分 --------- */
            };
            reader.readAsDataURL(file);
        });
        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    const uploadImgView = (fileElm: HTMLInputElement) => {
        if (fileElm.files !== null && fileElm.files[0].size >= (1000 * 1000)) {
            alert('1MB以下の画像をアップできます'); // 1MB = 1,000,000
            return; // 早期リターンで処理終了
        }

        setFile(fileElm.files);
        const files = fileElm.files as FileList;

        // 画像アップロードの取り消しを行った場合は画像を画面から削除
        if (files.length === 0) setBase64ImageStr((_prevImageStr) => null);

        // FileList のままだと forEach が使えないので配列に変換する
        const fileArray = Array.from(files);

        fileArray.forEach((file) => {
            // ファイルを読み込むために FileReader を利用する
            const reader = new FileReader();

            // ファイルの読み込みが完了したら画像の配列に加える
            reader.onloadend = () => {
                const result = reader.result as string;
                setBase64ImageStr((_prevImageStr) => result);
                setItemImgSrc((_prevItemImgSrc) => result);
            };

            // 画像ファイルを base64 形式で読み込む
            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <input
                type="file"
                accept={`${[...fileAccept]}`}
                onChange={(fileElm: ChangeEvent<HTMLInputElement>) => uploadImgView(fileElm.currentTarget)}
            />
            {base64ImageStr && <img src={base64ImageStr as string} />}
        </>
    );
});