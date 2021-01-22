import { capitalise } from "../tools/formatting.js";
export let inventory = [];
function addToInventory(item) {
    inventory.push(item);
}
/**
 * Transfer items form an array of items to the inventory one by one.
 * @param items Array of items
 */
export function loadBulkInventory(items) {
    items.forEach(element => addToInventory(element));
}
export function getInventory() {
    return inventory;
}
export function clearInventory() {
    inventory.length = 0;
    return inventory;
}
export function getItem(item) {
    const inInventory = inventory.find(element => element.itemCode == item.itemCode);
    let inventoryTab = document.querySelector("#inventory-tab");
    let inventoryTabContent = document.querySelector("#inventory-tabContent");
    if (!inInventory) {
        console.log(`${item.itemName} has been added to inventory`);
        addToInventory(item);
        console.log(inventory);
        appendItemHTML(inventoryTab, inventoryTabContent, item);
    }
    else {
        inInventory.itemQty += 1;
        console.log(`${item.itemName} is already in the inventory. Adding 1 to quantity.`);
        console.log(inventory);
    }
}
/**
 * After picking up an item, the item's name and description will be viewable on Inventory's UI
 * @param inventoryTab HTMLElement that will contain the item's name (Bootstrap's tab pills)
 * @param inventoryTabContent HTMLElement that will contain the item's description (Bootstrap's tab-pane)
 * @param item
 */
export function appendItemHTML(inventoryTab, inventoryTabContent, item) {
    let tab = `<li class="nav-item" role="presentation">
        <a class="nav-link" 
        id="pills-${item.itemCode}-tab" 
        data-bs-toggle="pill" 
        href="#pills-${item.itemCode}" 
        role="tab" 
        aria-controls="pills-${item.itemCode}" aria-selected="false">${capitalise(item.itemName)}</a>
        </li>`;
    inventoryTab.innerHTML += tab;
    let tabContent = `<div class="tab-pane fade" 
    id="pills-${item.itemCode}" 
    role="tabpanel" 
    aria-labelledby="pills-${item.itemCode}-tab">
    ${item.description}
    </div>`;
    inventoryTabContent.innerHTML += tabContent;
}
//TODO: Shows item quantity on screen.
