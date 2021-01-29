//each itemCode must be unique
//Don't use special characters in itemCode. There will be consequences (bug).
/**
 * pickedUpItem contains information regarding an item that's been "picked up" by player.
 * Information includes itemName, itemCode, and location (paragraph id)
 */
export class pickedUpItem {
    constructor(n, c, l) {
        this.itemName = n;
        this.itemCode = c;
        this.location = l;
    }
}
