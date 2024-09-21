export type itemCategoryType = 'food_drink' | 'utils' | 'family' | 'myself' | 'others';

export type korekauItemsType = {
    uuid: string; // key へ渡すための固有の識別子（uuid：Universally Unique Identifier）。useRegiKorekauItem.ts にて生成 
    itemName: string;
    itemNumber: string | number;
    itemCategory: itemCategoryType;
    itemPriority: boolean;
    itemMemo?: string;
    itemImg?: string;
}