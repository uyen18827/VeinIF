let inventory = [];
function addToInventory(item) {
    inventory.push(item);
}
function getItems() {
    return inventory;
}
function clearInventory() {
    inventory.length = 0;
    return inventory;
}
function scourAdd(item) {
}
export {};
