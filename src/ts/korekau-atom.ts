import { atom } from "jotai";
import { korekauItemsType } from "../components/korekau/ts/korekau";
import { localstorageLabel_KorekauItems } from "./korekau-localstorageLabel";

const localstorageLabelKorekauItems: string = localstorageLabel_KorekauItems;

export let korekauItemsLocalStorageAtom = atom<korekauItemsType[]>([]);

/* 既存の localStorage データを取得して（データがあれば）Atom に代入 */
const getLocalStorageItems: string | null = localStorage.getItem(localstorageLabelKorekauItems);
if (getLocalStorageItems !== null) {
    const SaveLocalStorageDateItems: korekauItemsType[] = JSON.parse(getLocalStorageItems);
    korekauItemsLocalStorageAtom = atom([...SaveLocalStorageDateItems]);
}

export const korekauAtom = atom<korekauItemsType[]>([]);