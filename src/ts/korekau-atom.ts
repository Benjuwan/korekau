import { atom } from "jotai";
import { korekauItemsType } from "../components/korekau/ts/korekau";


/* 既存の localStorage データを取得して（データがあれば）Atom に代入 */
export let korekauLocalStorageAtom = atom<korekauItemsType[]>([]);
const getLocalStorageItems: string | null = localStorage.getItem('korekau');
if (getLocalStorageItems !== null) {
    const SaveLocalStorageDateItems: korekauItemsType[] = JSON.parse(getLocalStorageItems);
    korekauLocalStorageAtom = atom([...SaveLocalStorageDateItems]);
}

export const korekauAtom = atom<korekauItemsType[]>([]);
