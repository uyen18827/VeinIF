import { Paragraphs, Precondition } from "./paragraph";

export interface Items {
    itemName: string,
    description?: string;
    itemImg?: string,
    itemQty: number,
    itemCode: string,
    precondition?: Precondition;
    pickedUp?: boolean;
}
//each itemCode must be unique
//Don't use special characters in itemCode. There will be consequences (bug).

/**
 * pickedUpItem contains information regarding an item that's been "picked up" by player.
 * Information includes itemName, itemCode, and location (paragraph id)
 */
export class pickedUpItem {
    itemName: string;
    itemCode: string;
    location: Paragraphs["id"];
    constructor(n: string, c: string, l: Paragraphs["id"]) {
        this.itemName = n;
        this.itemCode = c;
        this.location = l;
    }
}