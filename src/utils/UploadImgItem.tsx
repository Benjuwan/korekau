import { ChangeEvent, memo, useState } from "react";

type UploadImgItemType = {
    itemImgSrc: string;
    setItemImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

export const UploadImgItem = memo(({ props }: { props: UploadImgItemType }) => {
    const { itemImgSrc, setItemImgSrc } = props;

    const [_, setFile] = useState<FileList | null>(null); // input[type="file"] のデータ
    const fileAccept: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']; // input[type="file"] で指定可能な mineType

    const uploadImgView = (fileElm: HTMLInputElement) => {
        // 画像アップロードの取り消しを行った場合は画像を画面から削除  
        if (fileElm.files?.length === 0) {
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
        const fileArray: File[] = Array.from(files);

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