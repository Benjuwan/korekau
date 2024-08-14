import { useAtom } from "jotai";
import { ChangeEvent, memo, useEffect } from "react";
import { korekauAtom } from "../ts/korekau-atom";

type UploadImgItemType = {
    itemImgSrc: string;
    setItemImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

export const UploadImgItem = memo(({ props }: { props: UploadImgItemType }) => {
    const { itemImgSrc, setItemImgSrc } = props;

    const [korekauLists] = useAtom(korekauAtom);

    const fileAccept: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']; // input[type="file"] で指定可能な mineType

    const resetFileNamePlaceholderTxt: () => void = () => {
        const inputFile: HTMLInputElement | null = document.querySelector('.korekauSection input[type="file"]');
        /* 一度ファイルアップロードした形跡を持つ場合は以降アップロード時のプレースホルダーテキストを非表示（透明）にする */
        if (inputFile?.hasAttribute('data-gtm-form-interact-field-id')) {
            /* file.name（file: File）の削除や非表示は仕様上不可能（セキュリティ面の観点から禁止されているそう）なので回避策としてCSSで対応 */
            inputFile.style.setProperty('color', 'transparent');
        }
    }

    const uploadImgView = (fileElm: HTMLInputElement) => {
        // 画像アップロードの取り消しを行った場合は画像を画面から削除  
        if (fileElm.files?.length === 0) {
            setItemImgSrc('');
            return; // 早期リターンで処理終了
        }

        /* resetFileNamePlaceholderTxt メソッドで非表示（透明）になったアップロードファイル名を表示 */
        const inputFile: HTMLInputElement | null = document.querySelector('.korekauSection input[type="file"]');
        inputFile?.style.setProperty('color', '#333');

        if (
            fileElm.files !== null &&
            fileElm.files[0].size &&
            fileElm.files[0].size >= (1000 * 1000)
        ) {
            alert('1MB以下の画像をアップできます'); // 1MB = 1,000,000（1000b：1kb * 1000:1000kb：1mb）
            return; // 早期リターンで処理終了
        }

        const files = fileElm.files ?? fileElm.files;

        // FileList のままだと forEach が使えないので配列に変換する
        const fileArray: File[] | null = Array.from(files as FileList);
        fileArray.forEach((file) => {
            // ファイルを読み込むために FileReader を利用する
            const reader: FileReader = new FileReader();

            // ファイルの読み込みが完了したら画像の配列に加える
            reader.onloadend = () => {
                const result = reader.result as string;
                setItemImgSrc((_prevItemImgSrc) => result);
            };

            // 画像ファイルを base64 形式で読み込む
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => resetFileNamePlaceholderTxt(), [korekauLists]);

    return (
        <>
            <input
                type="file"
                accept={`${[...fileAccept]}`}
                onChange={(fileElm: ChangeEvent<HTMLInputElement>) => uploadImgView(fileElm.currentTarget)}
                id="itemImgSrc"
            />
            {itemImgSrc && <img src={itemImgSrc} />}
        </>
    );
});