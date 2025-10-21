import { useState } from "react";
import { useAtom } from "jotai";
import { korekauAtom } from "../ts/korekau-atom";

export const useCheckActiveContentHeight = () => {
    const [activeContentHeight, setActiveContentHeight] = useState<number | 'auto'>('auto');

    const [korekau] = useAtom(korekauAtom);

    // 他のSwiperコンテンツの高さを最適化するために当該コンテンツの高さを調整する関数
    //（スワイパーは特性上「最も情報量の多いコンテンツの高さ`height`を全体要素の基準とする」ため「情報量の少ないコンテンツにとっては過剰な高さとなってしまう」ので以下のように調整している）
    const checkActiveContentHeight: () => (() => void) | undefined = () => {
        const swiperSlideActive: HTMLElement | null = document.querySelector('.swiper-slide-active');
        const firstSection: HTMLElement | null | undefined = swiperSlideActive?.querySelector('section');

        if (typeof firstSection === 'undefined' || firstSection === null) {
            return;
        }

        // localStorageからのデータ読み込み後に「アクティブなスワイパー内にある最初の`section`要素コンテンツの高さ」を取得したいので遅延処理を実施
        const timeoutId = setTimeout(() => {
            const contentHeight: number = firstSection.clientHeight;
            setActiveContentHeight(Math.ceil(contentHeight));
        });

        // メモリリーク対策のクリーンアップ処理
        // 注: Swiperのイベントハンドラでは戻り値は使われないが、
        // 将来useEffectで使う可能性を考慮してクリーンアップを記述
        return () => {
            clearTimeout(timeoutId);
        }
    }

    // 編集フォームの見切れ防止のために当該コンテンツの高さを調整する関数
    //（単純に加算処理すると「最も情報量の多いコンテンツの高さまでも加算処理して過剰な高さが生まれてしまう」ので`checkActiveContentHeight`関数処理の調整関数という働きをしている）
    const forKorekau_adjustActiveContentHeight: (targetSwiperClassName: string) => number | 'auto' = (targetSwiperClassName: string) => {
        if (activeContentHeight === 'auto' || korekau.length > 2) {
            return 'auto';
        }

        const targetSwiper: HTMLDivElement | null = document.querySelector(`.${targetSwiperClassName}`);
        const isTargetActive: boolean | undefined = targetSwiper?.classList.contains('swiper-slide-active');

        // アクティブかどうかを判断基準に、コンテンツの高さを調整するための数値を返却
        if (typeof isTargetActive !== 'undefined' && isTargetActive) {
            const adjustValue: number = korekau.length === 0 ? 2 : korekau.length + 1; // 最低値で2倍
            return activeContentHeight * adjustValue;
        }

        return 'auto';
    }

    return { activeContentHeight, checkActiveContentHeight, forKorekau_adjustActiveContentHeight }
}