export type CompareItemsType = {
    uuid: string; // key に渡すための固有の識別子。CompareForm.tsx の entryCompareItem メソッドで生成
    amount: string | number;
    price: string | number;
    result: string;
};