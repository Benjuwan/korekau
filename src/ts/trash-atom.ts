import { atom } from "jotai";
import { trashType } from "../components/trash/ts/trash";
import { localstorageLabel_TrashDate } from "./trash-localstorageLabel";

const localstorageLabeltrashDate: string = localstorageLabel_TrashDate;

export let trashDateLocalStorageAtom = atom<trashType[]>([]);

/* 既存の localStorage データを取得して（データがあれば）Atom に代入 */
const getLocalStorageItems: string | null = localStorage.getItem(localstorageLabeltrashDate);
if (getLocalStorageItems !== null) {
    const SaveLocalStorageDateItems: trashType[] = JSON.parse(getLocalStorageItems);
    trashDateLocalStorageAtom = atom([...SaveLocalStorageDateItems]);
}

export const trashDateAtom = atom<trashType[]>([]);