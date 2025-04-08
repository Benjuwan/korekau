import { memo, SyntheticEvent, useMemo, useRef, useState } from "react";
import { korekauItemsType } from "../components/korekau/ts/korekau";

type UploadImgItemType = {
    korekauItem: korekauItemsType;
    setKorekauItem: React.Dispatch<React.SetStateAction<korekauItemsType>>;
    KorekauItemList?: korekauItemsType;
}

export const UploadImgItem = memo(({ props }: { props: UploadImgItemType }) => {
    const { korekauItem, setKorekauItem, KorekauItemList } = props;

    const [resetImgSrc, setResetImgSrc] = useState<boolean>(false);

    const itemImgSrc: string | undefined = useMemo(() => {
        if (typeof KorekauItemList !== 'undefined' && korekauItem.itemImg?.length === 0) {
            return KorekauItemList.itemImg;
        }
        return korekauItem.itemImg;
    }, [korekauItem, KorekauItemList]);

    const inputImgSrcRef = useRef<HTMLInputElement | null>(null);
    if (inputImgSrcRef.current !== null) {
        inputImgSrcRef.current.value = ''; // input[type="file"] の中身をリセット（初期化）
    }

    const fileAccept: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']; // input[type="file"] で指定可能な mineType

    const handleItemImgSrc: (value: string) => void = (value: string) => {
        setResetImgSrc(false);
        const newKorekauItem: korekauItemsType = {
            ...korekauItem,
            itemImg: value
        }
        setKorekauItem(newKorekauItem);
    }

    const resetItemImgSrc: () => void = () => {
        setResetImgSrc(true);
        const deleteImgSrcKorekauItem: korekauItemsType = {
            ...korekauItem,
            itemImg: ''
        }
        setKorekauItem(deleteImgSrcKorekauItem);
    }

    const uploadImgView: (fileElmEve: SyntheticEvent<HTMLInputElement>) => void = (fileElmEve: SyntheticEvent<HTMLInputElement>) => {
        const fileElm: HTMLInputElement = fileElmEve.currentTarget;

        // 画像アップロードの取り消しを行った場合は画像を画面から削除  
        if (fileElm.files?.length === 0) {
            handleItemImgSrc('');
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

        const files = fileElm.files ?? fileElm.files;
        // FileList のままだと forEach が使えないので配列に変換する
        const fileArray: File[] | null = Array.from(files as FileList);
        fileArray.forEach((file) => {
            // ファイルを読み込むために FileReader を利用する
            const reader: FileReader = new FileReader();

            // ファイルの読み込みが完了したら画像の配列に加える
            reader.onloadend = () => {
                const result = reader.result as string;
                handleItemImgSrc(result);
            };

            // 画像ファイルを base64 形式で読み込む
            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <input type="file"
                ref={inputImgSrcRef}
                accept={`${[...fileAccept]}`}
                onChange={uploadImgView}
                id="itemImgSrc"
                className="mb-[.5em] w-full text-[0.875rem] file:cursor-pointer file:mr-4 file:rounded-sm file:border file:border-transparent file:bg-[#eaeaea] file:px-4 file:py-1 file:text-[#333] hover:file:border-[#333]"
            />
            {(itemImgSrc && !resetImgSrc) &&
                <>
                    <button type="button" onClick={resetItemImgSrc}>参照画像をリストから削除</button>
                    <img src={itemImgSrc} alt={`${korekauItem.itemName}の参照画像`} />
                </>
            }
        </>
    );
});