export type trashType = {
    uuid: string; // key へ渡すための固有の識別子（uuid：Universally Unique Identifier）。useRegiTrashDate.ts にて生成 
    day: number;
    trashDate: string;
};