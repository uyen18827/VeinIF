import { Paragraphs, Precondition } from "./paragraph";
/**Interface for items that's displayed in a paragraph */
export interface Items {
    itemName: string,
    description: string;
    itemImg?: string,
    itemQty: number,
    itemCode: string,
    precondition?: Precondition;
}
//each itemCode must be unique
//Don't use special characters in itemCode. There will be consequences (bug).

/**
 * When player pick up and Item and put it into their inventory,
 * It'll turn into InventoryItem, which saves the item's info and
 * where it was picked up (its location - paragraph id)
 */
export class inventoryItem {
    // pickedUpLocation: Array<Paragraphs["id"]> = [];
    pickedUpLocation: Array<Paragraphs["name"]> = [];
    item: Items;
    constructor(i: Items, p: Paragraphs["name"]) {
        this.item = i;
        this.pickedUpLocation.push(p);
    }
}

export interface requiredItem {
    itemName: Items[`itemName`],
    itemCode: Items[`itemCode`],
    itemQty: number;
}
// type itemCondition = Omit<Items, 'description'>

//NOTE for authors: Please refrain from  changing Paragraph's name as this would affect
//pickedUpLocation and other paragraph's dependency