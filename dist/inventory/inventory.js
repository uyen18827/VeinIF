export let inventory = [];
function addToInventory(item) {
    inventory.push(item);
}
export function getInventory() {
    return inventory;
}
export function clearInventory() {
    inventory.length = 0;
    return inventory;
}
function scourAdd(item) {
}
export function getItem(item) {
    const inInventory = inventory.find(element => element.itemName == item.itemName);
    if (!inInventory) {
        console.log(`${item.itemName} has been added to inventory`);
        addToInventory(item);
        console.log(inventory);
    }
    else {
        inInventory.itemQty += 1;
        console.log(`${item.itemName} is already in the inventory. Adding 1 to quantity.`);
        console.log(inventory);
    }
}
