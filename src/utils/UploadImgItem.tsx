import { ChangeEvent, memo, useState } from "react";

type UploadImgItemType = {
    setItemImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

export const UploadImgItem = memo(({ props }: { props: UploadImgItemType }) => {
    const { setItemImgSrc } = props;

    /* korekauForm から img 用のState を props として持ってくる？ */

    const [base64ImageStr, setBase64ImageStr] = useState<string | undefined>(undefined); // input[type="file"] でアップした画像のバイナリデータ管理用

    const [_, setFile] = useState<FileList | null>(null); // input[type="file"] のデータ
    const fileAccept: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']; // input[type="file"] で指定可能な mineType

    const uploadImgView = (fileElm: HTMLInputElement) => {
        // 画像アップロードの取り消しを行った場合は画像を画面から削除  
        if (fileElm.files?.length === 0) {
            console.log(fileElm.files, fileElm.files.length);
            setBase64ImageStr(undefined);
            setFile(null);
            setItemImgSrc('');
            return; // 早期リターンで処理終了
        }

        if (
            fileElm.files !== null &&
            fileElm.files[0].size &&
            fileElm.files[0].size >= (1000 * 1000)
        ) {
            alert('1MB以下の画像をアップできます'); // 1MB = 1,000,000（1000b：1kb * 1000:1000kb：1mb）
            return; // 早期リターンで処理終了
        }

        setFile(fileElm.files);
        const files = fileElm.files as FileList;

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

        setBase64ImageStr(undefined);
    };

    return (
        <>
            <input
                type="file"
                accept={`${[...fileAccept]}`}
                onChange={(fileElm: ChangeEvent<HTMLInputElement>) => uploadImgView(fileElm.currentTarget)}
            />
            {base64ImageStr && <img src={base64ImageStr} />}
        </>
    );
});