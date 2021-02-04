//each itemCode must be unique
//Don't use special characters in itemCode. There will be consequences (bug).
/**
 * When player pick up and Item and put it into their inventory,
 * It'll turn into InventoryItem, which saves the item's info and
 * where it was picked up (its location - paragraph id)
 */
export class inventoryItem {
    constructor(i, p) {
        this.pickedUpLocation = [];
        this.item = i;
        this.pickedUpLocation.push(p);
    }
}
