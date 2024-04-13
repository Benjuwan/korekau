export type korekauItemsType = {
    uuid: string; // key へ渡すための固有の識別子（uuid：Universally Unique Identifier）。useRegiKorekauItem.ts にて生成 
    itemName: string;
    itemNumber: number;
    itemCategory: string;
    itemPriority: boolean;
    itemMemo?: string;
    itemImg?: string;
}