import { ItemModel } from "./item-model";

export interface CartItemModel {
    item: ItemModel;
    amount: number;
}